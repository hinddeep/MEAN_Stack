module.exports.insert = function(res,db, i, fname, lname)
{	
	console.log("enter insert");
	console.log(fname);
	console.log(lname);
			db.stud.save({'id':i,'FirstName':fname,'LastName':lname},function(err, saved){
								
				if( err || !saved )
					{ 
					console.log("Record not saved");
					res.json({"ok":0});
					res.end();	 				
					}
				else {
					console.log("Inserted Successfully!"); 
					res.json({"ok":1});	
					res.end();
				}
			});
};