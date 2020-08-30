<template>
	<div class="SideBar">
		<div id="links">
			<router-link to="/Home">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40.503"
					height="31.496"
					viewBox="0 0 40.503 31.496"
				>
					<path
						id="Icon_awesome-home"
						data-name="Icon awesome-home"
						d="M19.714,10.425,6.75,21.1V32.625A1.125,1.125,0,0,0,7.875,33.75l7.879-.02A1.125,1.125,0,0,0,16.874,32.6v-6.73A1.125,1.125,0,0,1,18,24.75h4.5a1.125,1.125,0,0,1,1.125,1.125V32.6a1.125,1.125,0,0,0,1.125,1.129l7.876.022a1.125,1.125,0,0,0,1.125-1.125V21.094L20.789,10.425A.857.857,0,0,0,19.714,10.425Zm20.477,7.257-5.878-4.845V3.1a.844.844,0,0,0-.844-.844H29.531a.844.844,0,0,0-.844.844V8.2l-6.3-5.179a3.375,3.375,0,0,0-4.289,0L.305,17.681A.844.844,0,0,0,.193,18.87l1.793,2.18a.844.844,0,0,0,1.189.115L19.714,7.542a.857.857,0,0,1,1.076,0l16.54,13.622a.844.844,0,0,0,1.188-.112l1.793-2.18a.844.844,0,0,0-.12-1.19Z"
						transform="translate(0.001 -2.254)"
						fill="#fff"
					/>
				</svg>
			</router-link>
			<router-link to="/Courses">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="39.503"
					height="32.321"
					viewBox="0 0 39.503 32.321"
				>
					<path
						id="Icon_material-school"
						data-name="Icon material-school"
						d="M8.682,22.779v7.182l12.569,6.859,12.569-6.859V22.779L21.251,29.638ZM21.251,4.5,1.5,15.274,21.251,26.047l16.16-8.816V29.638H41V15.274Z"
						transform="translate(-1.5 -4.5)"
						fill="#fff"
					/>
				</svg>
			</router-link>
			<router-link
				:to="{ name: 'Academies', params: { allAcademies: false } }"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="35.5"
					height="40.391"
					viewBox="0 0 35.5 40.391"
				>
					<g id="whiteboard" transform="translate(-31)">
						<g
							id="Group_15"
							data-name="Group 15"
							transform="translate(31)"
						>
							<path
								id="Path_6"
								data-name="Path 6"
								d="M64.133,21.6V6.882A3.541,3.541,0,0,0,62.95,0H34.55a3.541,3.541,0,0,0-1.183,6.882V21.6a3.541,3.541,0,0,0,1.183,6.882H44.91l-8.872,9.937A1.183,1.183,0,1,0,37.8,40l9.771-10.935V39.208a1.183,1.183,0,0,0,2.367,0V29.064L59.7,40a1.183,1.183,0,0,0,1.759-1.583L52.59,28.479H62.95A3.541,3.541,0,0,0,64.133,21.6ZM34.55,2.367h28.4a1.183,1.183,0,0,1,0,2.367H34.55a1.183,1.183,0,1,1,0-2.367Zm28.4,23.746H34.55a1.183,1.183,0,0,1,0-2.367h28.4a1.183,1.183,0,0,1,0,2.367Z"
								transform="translate(-31 0)"
								fill="#fff"
							/>
						</g>
					</g>
				</svg>
			</router-link>
			<router-link to="/Play">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="35.257"
					height="39.885"
					viewBox="0 0 35.257 39.885"
				>
					<path
						id="Icon_awesome-chess-rook"
						data-name="Icon awesome-chess-rook"
						d="M25.875,2.25H21.938a1.125,1.125,0,0,0-1.125,1.125V6.75H17.438V3.375A1.125,1.125,0,0,0,16.313,2.25H10.688A1.125,1.125,0,0,0,9.563,3.375V6.75H6.195V3.375A1.125,1.125,0,0,0,5.07,2.25H1.125A1.125,1.125,0,0,0,0,3.375V15.75L4.5,18a58.625,58.625,0,0,1-.929,11.25H23.429A58.884,58.884,0,0,1,22.5,18L27,15.75V3.375A1.125,1.125,0,0,0,25.875,2.25ZM15.75,22.5h-4.5V18a2.25,2.25,0,0,1,4.5,0Zm10.125,9H1.125A1.125,1.125,0,0,0,0,32.625v2.25A1.125,1.125,0,0,0,1.125,36h24.75A1.125,1.125,0,0,0,27,34.875v-2.25A1.125,1.125,0,0,0,25.875,31.5Z"
						transform="translate(-0.62 5.279) rotate(-16)"
						fill="#fff"
					/>
				</svg>
			</router-link>
		</div>
		<div id="controls">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="34.875"
				height="34.875"
				viewBox="0 0 34.875 34.875"
			>
				<path
					id="Icon_awesome-undo-alt"
					data-name="Icon awesome-undo-alt"
					d="M17.968.563A17.378,17.378,0,0,0,5.954,5.392L3.443,2.881A1.687,1.687,0,0,0,.563,4.074V13.5A1.687,1.687,0,0,0,2.25,15.188h9.426a1.688,1.688,0,0,0,1.193-2.881L9.934,9.371a11.812,11.812,0,1,1,.288,17.519.842.842,0,0,0-1.151.039L6.282,29.718a.845.845,0,0,0,.034,1.226A17.438,17.438,0,1,0,17.968.563Z"
					transform="translate(-0.563 -0.563)"
					fill="#fefafa"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="34.875"
				height="34.875"
				viewBox="0 0 34.875 34.875"
			>
				<path
					id="Icon_awesome-redo-alt"
					data-name="Icon awesome-redo-alt"
					d="M18.032.563A17.378,17.378,0,0,1,30.046,5.392l2.511-2.511a1.688,1.688,0,0,1,2.881,1.193V13.5a1.687,1.687,0,0,1-1.687,1.688H24.324a1.688,1.688,0,0,1-1.193-2.881l2.936-2.936a11.812,11.812,0,1,0-.288,17.519.842.842,0,0,1,1.151.039l2.789,2.789a.845.845,0,0,1-.034,1.226A17.438,17.438,0,1,1,18.032.563Z"
					transform="translate(-0.563 -0.563)"
					fill="#fff"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="31.5"
				height="20.531"
				viewBox="0 0 31.5 20.531"
			>
				<path
					id="Icon_ionic-md-rewind"
					data-name="Icon ionic-md-rewind"
					d="M17.55,28.266V7.734L2.25,18ZM18.45,18l15.3,10.266V7.734Z"
					transform="translate(-2.25 -7.734)"
					fill="#fff"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="31.5"
				height="20.531"
				viewBox="0 0 31.5 20.531"
			>
				<path
					id="Icon_ionic-md-rewind"
					data-name="Icon ionic-md-rewind"
					d="M17.55,28.266V7.734L2.25,18ZM18.45,18l15.3,10.266V7.734Z"
					transform="translate(33.75 28.266) rotate(180)"
					fill="#fff"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style  scoped>
svg {
	width: 28px;
}
.SideBar {
	display: flex;
	flex-direction: column;
	width: 50px;
	height: 100vh;
	background-color: #00112c;
}
#links {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 40%;
	justify-content: space-around;
}

#controls {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 60%;
	justify-content: center;
}
#controls svg {
	margin: 1rem;
	width: 25px;
}
</style>