import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import {React, useEffect, useState} from "react";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import BorderCard from "../components/BorderCard";
import TextInputBoxField from "../components/TextInputBoxField";
import { getAuth} from "firebase/auth";
import {getFirestore, getDocs, doc, collection, getDoc, where, query,onSnapshot} from 'firebase/firestore';
import {app} from '../firebase/firebase';


  
  export default function PastDoubts() {
    const auth=getAuth();
    const useruid = auth.currentUser.uid;
    const [doubts,setDoubts] = useState([]);
    const db = getFirestore(app);

    async function getDoubts(){
      const a = await getDoc(doc(db, "users", useruid));
      const enroll = a.data().enrollnmentNumber;
      const docRef = query(collection(db,"pastdoubts"),where("enrollnmentNumber", "==", enroll));
      const un = onSnapshot(docRef,(querySnapshot)=>{
        var arr =[];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        arr.push(doc.data())
      });
      setDoubts(arr);
      })
      // const docSnap = await getDocs(docRef);
      // var arr=[]
      //   docSnap.forEach(doc => {
      //       arr.push(doc.data())     
      // })
      // setDoubts(arr)
    }
    useEffect(() => {
      getDoubts()
    },[])
    function card(data) {
      return (
        <View>
       
        <BorderCard>
          <View style={styles.inputField}>
            <TextInputBoxField title={'Subject:'} editable={false} enteredValue={data.subject} multiline={true}></TextInputBoxField>
            <TextInputBoxField title={'Reply:'} editable={false} enteredValue={data.reply} multiline={true} textStyle={{color:Colors.darkred}}></TextInputBoxField>

          </View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Raised On:</Text>
            <Text style={styles.headingText}>Resolved On:</Text>
          </View>
          <View style={styles.answerView}>
            <Text style={styles.answerText}>{data.raisedDate}</Text>
            <Text style={styles.answerText2}>{data.resolvedDate}</Text>
          </View>
          <View style={styles.facultyView}>
            <Text style={styles.facultyText}><Text style={{fontWeight: '700', color: Colors.black}}>By:</Text> {data.fname}</Text>
          </View>
        </BorderCard>
       </View>
        )
      }
    return (
      <ScrollView style={styles.rootContainer}>
        <View>
        <View style={styles.titleView}>
            <Icon name="clock" color={Colors.grey} size={responsiveFontSize(3)}/>
            <Text style={styles.activeText}>Past Doubts</Text>
          </View> 
       <FlatList
      data={doubts}
      renderItem={({item}) => card(item)}
      keyExtractor={data => data.uid}
      >
      </FlatList>
       </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.white
    },
    activeText: {
      fontSize: responsiveFontSize(3),
      color:Colors.grey,
      fontWeight: '500',
      paddingLeft: responsiveWidth(2),
    },
    titleView:{
      paddingTop: responsiveHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: responsiveHeight(2)
    },
    inputField: {
      flex: 1,
      width: responsiveWidth(80),
      // flexWrap: 'wrap'
    },
    headingView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: responsiveHeight(0.5),
      paddingLeft: responsiveWidth(0.6),
      paddingRight: responsiveWidth(0.3),
      paddingTop: responsiveHeight(2)
    },
    headingText: {
      fontWeight: '700',
      fontSize: responsiveFontSize(2)
    },
    answerView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: responsiveWidth(0.6),
      paddingRight: responsiveWidth(0.3),
      paddingBottom: responsiveHeight(1)
    },
    answerText: {
      fontWeight: '700',
      fontSize: responsiveFontSize(2),
      color:Colors.grey,
      width: responsiveWidth(50),
      flexWrap: 'wrap'
    },
    answerText2: {
      fontWeight: '700',
      fontSize: responsiveFontSize(2),
      color:Colors.grey,
      width: responsiveWidth(50),
      flexWrap: 'wrap',
      marginLeft: responsiveWidth(7)
    },
    nameView:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: responsiveHeight(1)
    },
    facultyView:{
      padding: 10,
      flexDirection: 'row',
    } ,
    facultyText:{
      fontWeight: '700',
      fontSize: responsiveFontSize(2),
      color:Colors.grey,
      width: responsiveWidth(50),
      flexWrap: 'wrap',
      textAlign: 'center',
      alignItems: 'center',
      flex: 1
    },
    facultyHeading:{
      fontWeight: '700',
      fontSize: responsiveFontSize(2),
      textAlign: 'center',
      alignItems: 'center',
      
    }
  });
  