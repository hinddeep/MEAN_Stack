module.exports.del = function(db, id, res)
{
	console.log("enter delete");			
			
			db.stud.remove({'id':id},function(err, deleted){				
			if( err || !deleted )
				{ 
					console.log("Record not deleted");
					res.json({"ok":0});	
					res.end();  
				}
			else if(deleted.n > 0){
				console.log("Record " + id + " Deleted Successfully!"); 
				res.json({"ok":1});	
				res.end(); 
			}
			else
			{
				console.log("Record " + id + " NOT Deleted!"); 
				res.json({"ok":0});	
				res.end(); 
			}
		});
}