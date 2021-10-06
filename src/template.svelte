<!doctype html>
<html lang="en">
	<head>
		${head}
		<style>
			${include ../assets/global.css}
			
			${css}
		</style>
	</head>
	<body>
		${html}
		<script>
			props = ${props};
			
			${js}
			
			new ${name}({
				target: document.body,
				props: props,
				hydrate: true
			});
		</script>
	</body>
</html>