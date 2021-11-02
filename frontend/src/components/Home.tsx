import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบจัดการอาหารผู้ป่วยใน</h1>
        <h4>Requirements</h4>
        <p>
          ระบบผู้ป่วยในเป็นระบบที่ใช้ในการจัดการข้อมูลของผู้ป่วยใน 
          ซึ่งผู้ป่วยใน ณ ที่นี้หมายถึง ผู้ที่ลงทะเบียนเข้ารักษาตัวในโรงพยาบาล 
          หรือสถานพยาบาลเวชกรรม ติดต่อกันไม่น้อยกว่า 6 ชั่วโมง 
          และเมื่อมีการพักรักษาตัวที่โรงพยาบาลและจำเป็นต้องรับประทาอาหารตาม
          ข้อมูลบันทึกการรักษาของแพทย์ที่แพทย์กำหนดมา 
          โดยที่ระบบจัดการอาหารของผู้ป่วยในจะทำการบันทึกข้อมูลอาหารของผู้ป่วยแต่ละคน 
          ที่นักโภชนาการจัดสรรอาหารตามเซตอาหารที่มีและช่วงเวลาทานอาหารให้ผู้ป่วยตามอาการที่แพทย์วินิจฉัย

        </p>
        <img src="/restaurant.png" width="500px"></img>
      </Container>
    </div>
  );
}
export default Home;