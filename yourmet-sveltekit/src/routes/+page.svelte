<script>
	import Navbar from '../lib/navbar/Navbar.svelte';
	import UserInfo from '../lib/userinfo/UserInfo.svelte';
	import '../global.css';
	// const [gallery, setGallery] = useState([]);
	// const [modalState, showModal] = useState(false);
	// const [offCanvasState, showCanvas] = useState(false);
	// const [buttonID, setButtonID] = useState("");
	// const [fetchSwitch, toggleFetchSwitch] = useState(false);
	// const [seen, setSeen] = useState([]);

	let modalState = false;
</script>

<Navbar />
<UserInfo />