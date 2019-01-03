
const getInputs = () => {
	let name = $("#byWho").val().trim();
	let comment = $("#addedWhat").val().trim();
	let temp = new Date();
	let date = `${(temp.getMonth() + 1)}:${temp.getDate()}:${temp.getFullYear()}`;
	
	$("#byWho").val("");
	$("#addedWhat").val("");
	$("#overallList").empty();	

	return [name, comment, date];
};

const getComments = () => {
	comments.forEach(function(item) {
		 if (item.replyId) {
			let liTemp = $('<li/>').attr('class', 'reply').attr('id', item.id);
			let nameDiv = $('<div/>').attr('class', 'name').text(`Reply by: ${item.name}`);
			$(nameDiv).append($("<span class='date'></span>").text(item.date));
			let postDiv = $('<div/>').attr('class', 'post').text(item.comment);
			$(liTemp).append(nameDiv).append(postDiv);
			let replyInput = $('<input type="button" value="Add a Reply"/>').attr('class', 'replyBtn');	
			$(liTemp).append(nameDiv).append(postDiv).append(replyInput);
			
			$(`#${item.replyId}`).append(liTemp);
		} else {		
			let liTemp = $('<li/>').attr('class', 'entry').attr('id', item.id);
			let nameDiv = $('<div/>').attr('class', 'name').text(`Entry by: ${item.name}`);
			$(nameDiv).append($("<span class='date'></span>").text(item.date));
			let postDiv = $('<div/>').attr('class', 'post').text(item.comment);
			let replyInput = $('<input type="button" value="Add a Reply"/>').attr('class', 'replyBtn');	
			$(liTemp).append(nameDiv).append(postDiv).append(replyInput);
		
			$('#overallList').append(liTemp);
		}
	});
};

$(window).on("load", function() {
	getComments();
});

$("#button").on("click", function() {	
	let theInputs = getInputs();
	comments.push({"id": comments.length,  "replyId": "", "date": theInputs[2], "name": theInputs[0], "comment": theInputs[1]});
	getComments();
});

$("#overallList").on("click", ".replyBtn", function() {
	let parentId = $(this).parent().attr("id");	
	let theInputs = getInputs();	
	comments.push({"id": comments.length, "replyId": parentId, "date": theInputs[2], "name": theInputs[0], "comment": theInputs[1]});
	getComments();
});
