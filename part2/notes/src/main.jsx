// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// const fetchNotes = async () => {
//   try {
//     const res = await axios.get('http://localhost:3001/notes')
//     // console.log(res.data);
//     return res.data
//   } catch (error) {
//     console.error('Error fetching notes:', error)
//     return []
//   }
// }

// const renderApp = async () => {
//   const notes = await fetchNotes()
//   ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
// }

// renderApp()
