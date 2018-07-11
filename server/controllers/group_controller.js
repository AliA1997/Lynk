module.exports = {
    readGroup(req, res) {
        //Assign a variable that holds your database instance .
        const dbInstance = req.app.get('db');
        //Runs the sql file that reads the groups.
        db.read_all_group().then(groups => {
            ///Return the groups to the frontend.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Read All Groups Error------------'));
    },
    createGroup(req,res) {
        //Assign a variable that holds your database instance.
        const db = req.app.get('db');
        //Destruct the id from teh req.session.user.
        // const { id } = req.session.user;
        //Destruct the values that will be used to create a new group.
        const { group_name, group_description, group_members, id } = req.body;
        let group_image = 'image';
        //Assigning the new group the values we destructured.
        const newGroup = { group_name, group_description, group_image, group_members, group_admin: 1 };
        console.log('group admin-------', newGroup.group_admin);
        db.create_group(newGroup).then(groups => {
            //Return the group
            res.status(200).json({group: groups[0]});
        }).catch(err => console.log(err, 'Create Group Error-----------'));
    },
    updateGroup(req, res) {
        //Assign a variable that holds your database instance.
        const db = req.app.get('db');
        //Destruct the properties neeeded to created a updated group.
        const { id, admin_id,  group_name, group_description, group_member } = req.body;
        //Assign a variable called updatedGroup the new group properties.
        const updatedGroup = { id, admin_id, group_name, group_description, group_members }
        db.update_group(updatedGroup).then(groups => {
            //REturn a 200 status code and the updated groups.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Update Group Database Error--------------'));
    },
    deleteGroup(req, res) {
        //Assign variable call db that set to the database instance.
        const db = req.app.get('db');
        //Destruct the id to delete the group.
        const { id } = req.body;
        db.deleete_group(id).then(groups => {
            //Return a 200 status code with the updated groups.
            res.status(200).json({groups});
        }).catch(err => console.log(err, "Delete Group Database error------------"));
    },
    addMember(req, res) {
        //Assign variable call db that set to the database instance 
        const db = req.app.get('db');
        //Destruct the currentAttendeeSelected from the req.body.
        const { currentAttendeeSelected } = req.body;
        db.add_member(currentAttendeeSelected).then(groups => {
            //Return a 200 status code, and the updated members.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Add Member Database Error-----------'));
        
    },
    removeMember(req, res) {
        const db = req.app.get('db');
        //Destruct the currentAttendeeSelect from the req.body;
        const { currentAttendeeSelected } = req.body;
        db.remove_member(currentAttendeeSelected).then(groups => {
            //Return a 200 status code, and the updated members.
            res.status(200).json({groups});
        }).catch(err => console.log(err, 'Remove Member Database Error--------------'))
    }
}