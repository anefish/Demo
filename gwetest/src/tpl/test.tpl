<ul>
	<%
		for(var i=0; i<list.length; i++){
			var name = list[i].name;
	%>

		<li><%=name %></li>
	<%
		}
	%>

</ul>