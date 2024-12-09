const {readJsonFromFile, writeJsonToFile} = require("../utils/fileUtils");
const meetingsFilePath = "./data/meetings.json";
const usersPath = './data/users.json';

exports.getAllMeetings = async (req, res) => {
    const meetings = await readJsonFromFile(meetingsFilePath);
    const users = await readJsonFromFile(usersPath);
    const updatedMeetings = meetings.map((meeting)=>{
        const user = users.find((user)=>user.id===parseInt(meeting.createdBy));
        if(user){
            return {
                ...meeting,
                createdBy:user.name + " " + user.surname,
            };
        }else{
            return {
                ...meeting,
                createdBy:""
            };
        }
    })
    res.status(200).json(updatedMeetings);
};
exports.createMeeting = async (req, res) => {
    const {title, link,createdBy} = req.body;
    if(!title || !link  || !createdBy){ 
        return res.status(400).json({message: "Sva polja su obavezna."});
    }
    const meetings = await readJsonFromFile(meetingsFilePath);
    const newMeeting = {
        id: Date.now(),
        title,
        link,
        createdBy,
        date: new Date().toISOString(),
    };
    meetings.push(newMeeting);
    await writeJsonToFile(meetingsFilePath, meetings);
    res.status(201).json(newMeeting);
}
exports.deleteMeeting = async (req, res) => {
    const {id} = req.params;
    let meetings = await readJsonFromFile(meetingsFilePath);
    const meetingIndex = meetings.findIndex(
        (meeting) => meeting.id === parseInt(id)
    );
    if (meetingIndex !== -1) {
        meetings.splice(meetingIndex, 1);
        await writeJsonToFile(meetingsFilePath, meetings);
        res.status(200).json({ message: "Meeting je uspješno obrisan." });
    } else {
        res.status(404).send("Meeting nije pronadjen.");
    }
}