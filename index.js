const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let students = [
    {
        fullName: "Rajat Sachan",
        rollNo : 1706250,
        mentorId : 101
    },
    {
        fullName : "Ravi Kumar Raj",
        rollNo : 1706251,
        mentorId : 102
    },
    {
        fullName : "Pranav Jain",
        rollNo : 1706243,
        mentorId : 101
    },
    
    {
        fullName : "Pushkar Kumar",
        rollNo : 1706248,
        mentorId : 102
    },    
];

let mentors = [
    {
        mentorId : 101,
        fullName : "Venkat",
        students : [1706250]
    },
    {
        mentorId : 102,
        fullName : "RV",
        students : [1706251]
    },
];

app.get("/", (req, res) => {
    res.send("\t  Mentors Data Url : localhost:3000/mentors \n Students Data Url : localhost:3000/students \n \n For Adding Students : localhost:3000/add-student \n For Adding Mentors: localhost:3000/add-mentor \n For change in Student : localhost:3000/edit-student \n For change in Mentor : localhost:3000/edit-mentor \n For deleting Student : localhost:3000/delete-student \n For Deleting Mentor : localhost:3000/delete-mentor \n For Assigning Students to a mentor : localhost:3000/assign-students \n For Assigning mentors to a student : localhost:3000/assign-mentor \n For Finding students by mentorId : localhost:3000/find-students-by-mentor_id");
});
app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/mentors", (req, res) => {
    res.json(mentors);
});

app.post("/add-student", (req, res) => {
    
    try {
        students.push( req.body );
        res.send(req.body.name + " added to students!");

    } catch (err) {
        res.send("Failed to add student " + req.body.id +  "!");
    }
});

app.post("/add-mentor", (req, res) => {

    try {
        mentors.push( req.body );
        res.send(req.body.name + " added to mentors!");

    } catch (err) {
         res.send("Failed to add student " + req.body.id +  "!");
    }
    
});

app.put("/edit-student", (req, res) => {

    try {
        let index = students.findIndex(x => x.id == req.body.id);
        students[index] = req.body;
        res.send(req.body.name + " edited successfully");

    } catch (err) {
        res.send("Editing student failed!");
    }
    
});

app.put("/edit-mentor", (req, res) => {
    
    try {
        let index = mentors.findIndex(x => x.id == req.body.id);
        mentors[index] = req.body;
        res.send(req.body.name + " edited successfully");

    } catch (err) {
        res.send("Editing mentor failed!");
    }
});

app.delete("/delete-student", (req, res) => {
    
    try {
        let index = students.findIndex(x => x.id == req.body.id);
        if(index === -1)
            res.send("Student with id = " + req.body.id + " doesn't exists!");
        else 
        {
            students.splice(index, 1);
            res.send("Student with id = " + req.body.id + " deleted successfully!");
        }

    } catch (err) {
        res.send("Student deletion failed!");
    }
});

app.delete("/delete-mentor", (req, res) => {
    
    try {
        let index = mentors.findIndex(x => x.id == req.body.id);
        if(index === -1)
            res.send("Mentor with mentor_id = " + req.body.id + " doesn't exists!");
        else
        {
            mentors.splice(index, 1);
            res.send("Mentor with mentor_id = " + req.body.id + " deleted successfully");
        }

    } catch (err) {
        res.send("Mentor deletion failed");
    }
});

app.put("/assign-students", (req, res) => {

    try {
        let mentorIndex = mentors.findIndex(x => x.id == req.body.mentor_id);
        let studentsAssigned = req.body.students;

        mentors[mentorIndex].students = studentsAssigned;

        for(let i in studentsAssigned)
        {
            let studentIndex = students.findIndex(x => x.id == studentsAssigned[i]);
            students[studentIndex].mentor_id = req.body.mentor_id;
        }

        res.send("Students assigned to " +  mentors[mentorIndex].name + " successfully");
    
    } catch (err) {
        res.send("Students assignment failed!");
    }
});

app.put("/assign-mentor", (req, res) => {
    try {
        let studentIndex = students.findIndex(x => x.id == req.body.id);
        let mentorIndex = mentors.findIndex(x => x.id == req.body.mentor_id);

        students[studentIndex].mentor_id = req.body.mentor_id;

        mentors[mentorIndex].students.push(req.body.id);
        
        res.send( mentors[mentorIndex].name + " assigned to " +  students[studentIndex].name + " successfully");

    } catch (error) {
        res.send("Mentor assignment failed!");
    }
});

app.post("/find-students-by-mentor_id", (req, res) => {
    try {

        let foundStudents = [];
        for(let i in students)
        {
            if(students[i].mentor_id == req.body.mentor_id)
                foundStudents.push(students[i]);
        }
        res.send(foundStudents);

    } catch (err) {
        res.send("No students for mentor_id = " + req.body.mentor_id);
    }
});

app.listen(3000);