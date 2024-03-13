

const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;

function StudentTable({data, app}){
    return <table className='table'>
    <tr>
        <td>รหัส</td>
        <td>คำนำหน้า</td>
        <td>ชื่อ</td>
        <td>สกุล</td>
        <td>email</td>
        </tr>
        {
          data.map((s)=><tr>
          <td>{s.id}</td>
          <td>{s.title}</td>
          <td>{s.fname}</td>
          <td>{s.lname}</td>
          <td>{s.email}</td>
          <td><EditButton std={s} app={app}/></td>
          <td><DeleteButton std={s} app={app}/></td>        
          </tr> )
        }
    </table>
  }


  function TextInput({label,app,value,style}){
    return <label className="form-label">
    {label}:    
     <input className="form-control" style={style}
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }
  function EditButton({std,app}){
    return <button style={{ backgroundColor: "#6a0dad", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }} onClick={()=>app.edit(std)}>แก้ไข</button>
}

function DeleteButton({std,app}){    
  return <button style={{ backgroundColor: "#9a0b0b", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }} onClick={()=>app.delete(std)}>ลบ</button>
}

 



class App extends React.Component {
  title = (
    <Alert variant="info" style={{ backgroundColor: "#6A0DAD", color: "white" }}>
      <b>Work6 :</b> Firebase
    </Alert>
  );
  
    footer = (
      <div style={{ textAlign: "center" }}>
        By Nisrine Krodprakhon ID : 643021235-6 <br />
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],
        stdid:"",
        stdtitle:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        stdphone:"",
    }

      
    readData(){
        db.collection("students").get().then((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });
            console.log(stdlist);
            this.setState({students: stdlist});
        });
    }
    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });          
            this.setState({students: stdlist});
        });
    }
    insertData(){
        db.collection("students").doc(this.state.stdid).set({
           title : this.state.stdtitle,
           fname : this.state.stdfname,
           lname : this.state.stdlname,
           phone : this.state.stdphone,
           email : this.state.stdemail,
        });
    }
    edit(std){      
        this.setState({
         stdid    : std.id,
         stdtitle : std.title,
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
         stdphone : std.phone,
        })
     }
     delete(std){
        if(confirm("ต้องการลบข้อมูล")){
           db.collection("students").doc(std.id).delete();
        }
    }

 



    render() {
        // var stext = JSON.stringify(this.state.students);  
        return (
          <Card>
            <Card.Header>{this.title}</Card.Header>  
            <Card.Body>
            <Button style={{ backgroundColor: "#eec6ff", color: "black", border: "none", padding: "5px 10px", borderRadius: "5px" }} onClick={()=>this.readData()}>Read Data</Button>
            <Button style={{ backgroundColor: "#eec6ff", color: "black", border: "none", padding: "5px 10px", borderRadius: "5px" }} onClick={()=>this.autoRead()}>Auto Read</Button>
              <div>
              <StudentTable data={this.state.students} app={this}/>  
              </div>
            </Card.Body>
            <Card.Footer>
            <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br/>
            <TextInput label="ID" app={this} value="stdid" style={{width:120}}/>  
            <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{width:100}} />
            <TextInput label="ชื่อ" app={this} value="stdfname" style={{width:120}}/>
            <TextInput label="สกุล" app={this} value="stdlname" style={{width:120}}/>
            <TextInput label="Email" app={this} value="stdemail" style={{width:150}} />        
            
            <Button style={{ backgroundColor: "#a2f1aa", color: "black", border: "none", padding: "5px 10px", borderRadius: "5px" }} onClick={()=>this.insertData()}>Save</Button>
            </Card.Footer>
            <Card.Footer>{this.footer}</Card.Footer>
          </Card>          
        );
      }
  
  
    
       
  }
	
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfb49y55sxmdHxUAUyXOjbIWJY10rn2yM",
  authDomain: "web2566-80e89.firebaseapp.com",
  projectId: "web2566-80e89",
  storageBucket: "web2566-80e89.appspot.com",
  messagingSenderId: "24584438509",
  appId: "1:24584438509:web:ae92a67ebd2047fb5482e4",
  measurementId: "G-RX6NZKEBBK"
};
    firebase.initializeApp(firebaseConfig);      
    const db = firebase.firestore();
    // db.collection("students").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} =>`,doc.data());
//   });
// });




  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
