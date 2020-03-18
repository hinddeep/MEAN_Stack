module.exports.update = function(res, db, id, fname, lname)
{
	console.log("enter update");				
			db.stud.update({'id':id},{$set:{'FirstName':fname,'LastName':lname}},function(err, updated){				
			if( err || !updated )
				{ 
					console.log("Record not updated"); 
					res.json({"ok":0});	
					res.end(); 
				}
			else if(updated.n > 0){
				console.log("Record " + id + " updated Successfully!"); 
				res.json({"ok":1});	
				res.end(); 			
			}
			else
			{
				console.log("Record " + id + " NOT Updated!"); 
				res.json({"ok":0});	
				res.end(); 
			}
		});
};