<!doctype html>
<html lang="en">
	<head>
		${head}
		<link rel="stylesheet" href="${cssPath}">
	</head>
	<body style="margin:0;padding:0;">
		${html}
		<script src="${jsPath}"></script>
		<script>
			props = ${props};
			
			new ${name}({
				target: document.body,
				hydrate: true,
				props: props
			});
		</script>
	</body>
</html>