import './App.scss'

//Components
import AppBar from 'components/AppBar/AppBar';
import BoardBar from 'components/BoardBar/BoardBar';
import BoardContent from 'components/BoardContent/BoardContent';
function App() {
	return (
		<div className="wrapper">
			<AppBar />
			<BoardBar />
			<BoardContent />
		</div>
	);
}

export default App;
