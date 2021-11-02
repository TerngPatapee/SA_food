import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { TreatmentrecordsInterface } from "../models/ITreatmentrecord";
import { NutritionistsInterface } from "../models/INutritionist";
import { FoodsetsInterface } from "../models/IFoodset";
import { FoodtimesInterface } from "../models/IFoodtime";
import { FoodallocateInterface } from "../models/IFoodallocate";


import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function FoodallocateCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [nutritionists, setNutritionists] = useState<NutritionistsInterface[]>([]);
  const [treatmentrecords, setTreatmentrecords] = useState<TreatmentrecordsInterface[]>([]);
  const [foodsets, setFoodsets] = useState<FoodsetsInterface[]>([]);
  const [foodtimes, setFoodtimes] = useState<FoodtimesInterface[]>([]);
  const [foodAllocate, setFoodallocate] = useState<Partial<FoodallocateInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof foodAllocate;
    setFoodallocate({
      ...foodAllocate,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getNutritionists = async () => {
    fetch(`${apiUrl}/nutritionists`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setNutritionists(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getTreatmentrecords = async () => {
    fetch(`${apiUrl}/treatmentrecords`, requestOptions) //-------
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTreatmentrecords(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getFoodset = async () => {
    fetch(`${apiUrl}/foodsets`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setFoodsets(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getFoodtime = async () => {
    fetch(`${apiUrl}/foodtimes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setFoodtimes(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getNutritionists();
    getTreatmentrecords();
    getFoodset();
    getFoodtime();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      TreatmentrecordID: convertType(foodAllocate.TreatmentrecordID),
      NutritionistID: convertType(foodAllocate.NutritionistID),
      FoodsetID: convertType(foodAllocate.FoodsetID),
      FoodtimeID: convertType(foodAllocate.FoodtimeID),
    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/food_allocates`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              จัดสรรอาหารให้แก่ผู้ป่วย
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้ป่วย</p>
              <Select
                native
                value={foodAllocate.TreatmentrecordID}
                onChange={handleChange}
                inputProps={{
                  name: "TreatmentrecordID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเลขประจำตัวผู้ป่วย
                </option>
                {treatmentrecords.map((item: TreatmentrecordsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Patientid}
                  </option>
                ))}

              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
      
              <p>ประเภทประเภทอาหารของผู้ป่วย</p>
              <Select
                native
                disabled
                value={foodAllocate.FoodsetID}
              >
                {treatmentrecords.map((item: TreatmentrecordsInterface) => (
                  (foodAllocate["TreatmentrecordID"] == item.ID)?(<option value={item.ID} key={item.ID}>
                    {item.Foodtype}
                  </option>):""
                ))}

              </Select>
            </FormControl>

          </Grid>
      
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เซตอาหาร</p>
              <Select
                native
                value={foodAllocate.FoodsetID}
                onChange={handleChange}
                inputProps={{
                  name: "FoodsetID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเซตอาหาร
                </option>
                {foodsets.map((item: FoodsetsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Foodmenu}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}> 

                  <FormControl fullWidth variant="outlined">
              <p>ประเภทเครื่องดื่มของผู้ป่วย</p>
              <Select
                native
                disabled
                value={foodAllocate.FoodsetID}
               // onChange={handleChange}
               
              >

                {foodsets.map((item: FoodsetsInterface) => (
                  (foodAllocate["FoodsetID"] == item.ID)?(<option value={item.ID} key={item.ID}>
                    {item.Fooddrink}
                  </option>):""
              ))}
                

              </Select>
            </FormControl>

          </Grid>
      
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เวลาทานอาหาร</p>
              <Select
                native
                value={foodAllocate.FoodtimeID}
                onChange={handleChange}
                inputProps={{
                  name: "FoodtimeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเวลาทานอาหาร
                </option>
                {foodtimes.map((item: FoodtimesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Foodtime}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>นักโภชนาการ</p>
              <Select
                native
                value={foodAllocate.NutritionistID}
                onChange={handleChange}
                inputProps={{
                  name: "NutritionistID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อของคุณ
                </option>
                {nutritionists.map((item: NutritionistsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/food_allocates"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default FoodallocateCreate;