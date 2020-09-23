# To-Do-List-
DApp using cosmos blockchain and Lotion JS

step-1 : Run npm install <br/>
step-2 : Run node server.js

# LIST TASKS
http://localhost:3000/showTasks  <br />
Response: <br/>
{ <br/>
    "tasks": [  <br/>
        {  <br/>
            "completed": "Yes",  <br/>
            "id": 1,  <br/>
            "task": "Read"  <br/>
        }  <br/>
    ]  <br/>
}  <br/>

# ADD TASK
http://localhost:3000/addTask  <br />
{ 
    "task": "Read",
    "type": "Add Task"
}

# COMPLETE TASK
http://localhost:3000/completeTask   <br />
{
    "id":1,
    "type": "Complete Task"
}
