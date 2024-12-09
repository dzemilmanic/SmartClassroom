const {readJsonFromFile, writeJsonToFile} = require("../utils/fileUtils");
const notificationsFilePath = "./data/notifications.json";
const usersPath = './data/users.json';

exports.getAllNotifications = async (req, res) => {
    const notifications = await readJsonFromFile(notificationsFilePath);
    const users = await readJsonFromFile(usersPath);
    const updatedNotifications = notifications.map((notification)=>{
        const user = users.find((user)=>user.id===parseInt(notification.createdBy));
        if(user){
            return {
                ...notification,
                createdBy:user.name + " " + user.surname,
            };
        }else{
            return {
                ...notification,
                createdBy:""
            };
        }
    })
    res.status(200).json(updatedNotifications);
};
exports.createNotification = async (req, res) => {
    const {title, description,createdBy} = req.body;
    if(!title || !description  || !createdBy){ 
        return res.status(400).json({message: "Sva polja su obavezna."});
    }
    const notifications = await readJsonFromFile(notificationsFilePath);
    const newNotification = {
        id: Date.now(),
        title,
        description,
        createdBy,
        date: new Date().toISOString(),
    };
    notifications.push(newNotification);
    await writeJsonToFile(notificationsFilePath, notifications);
    res.status(201).json(newNotification);
}
exports.deleteNotification = async (req, res) => {
    const {id} = req.params;
    let notifications = await readJsonFromFile(notificationsFilePath);
    const notificationIndex = notifications.findIndex(
        (notification) => notification.id === parseInt(id)
    );
    if (notificationIndex !== -1) {
        notifications.splice(notificationIndex, 1);
        await writeJsonToFile(notificationsFilePath, notifications);
        res.status(200).json({ message: "Notification je uspješno obrisan." });
    } else {
        res.status(404).send("Notification nije pronadjen.");
    }
}