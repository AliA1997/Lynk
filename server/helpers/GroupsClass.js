class Groups {
    constructor() {
        this.groups = [];
    }

   AddUGroupData({socket_id, room, messages, users}){
        let group = {socket_id, messages, users, room}
        let index = this.GetRoomsAndGroupCount().findIndex(elem => elem.room == room)
        if(index != -1){                
                group.type = this.GetRoomsAndGroupCount()[index].type
        }
        if (this.groups.includes(`${socket_id}`) && this.groups.includes(`${room}`)){
            return 
        }else {
            this.groups.push(group)
            return group;
        }
    }

    RemoveGroup(socket_id){

        let indexOfgroupToRemove = this.groups.findIndex((group) => group.socket_id == socket_id);
        if(indexOfgroupToRemove !== -1){
            let room = this.groups[indexOfuserToRemove].room
            this.groups.splice(indexOfuserToRemove, 1);
            return room;
        }
    }

    GetGroupList(room){
        let groups = this.groups.filter(group => group.room === room);

        let groupsArray = groups.map(group => {
            return group;
        })

        let list = {
            groups: groupsArray,
            count: groupsArray.length
        }
        return list;
    }


    GetRandomGroupList(room, array){
        let groups = array.filter(group => group.room === room);

        let groupsArray = groups.map(group => {
            return group;
        })

        let list = {
            groups: groupsArray,
            count: groupsArray.length
        }
        return list;
    }

    GetRoomCount(room){
        let groupCount = [] 
        groups.filter(e => {
            if(e.room == room){
               groupCount.push(room)
            }
        })
        return groupCount.length
    }

    GetRoomsAndGroupCount(){
    
        let roomsArray = []
        for(let i = 0; i < this.groups.length; i++){
            if(!roomsArray.includes(this.groups[i].room)){
                roomsArray.push(this.groups[i])
            }
        }
        let roomsAndCount = roomsArray.map(room => {
            let count = this.groups.filter((group)=> group.room == room.room)
            return {
                name: room.room,
                groups: count.length,
                type: room.type
            }
        })

        roomsAndCount.sort((a,b) => b.count - a.count) 
        return roomsAndCount;
    }

    GetRandomRoomsAndGroupCount(){
    
        let roomsArray = []
        for(let i = 0; i < this.groups.length; i++){
            if(!roomsArray.includes(this.groups[i].room)){
                roomsArray.push(this.groups[i])
            }
        }
        let roomsAndCount = roomsArray.map(room => {
            let count = this.groups.filter((group)=> group.room == room.room)
            return {
                name: room.room,
                groups: count.length,
                type: room.type
            }
        })

        roomsAndCount.sort((a,b) => b.count - a.count)
        return roomsAndCount;
    }

}

module.exports = {Groups}