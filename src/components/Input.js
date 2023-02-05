import { useRef } from 'react';
import classes from './Input.module.css';

const Input = (props) => {
   const titleRef = useRef('')
   const openingtextRef = useRef('')
   const releaseDateRef = useRef('') 

   const addMovieHandler = (e) => {
      e.preventDefault()
      
      const movie = {
        Title: titleRef.current.value,
        Opening_text: openingtextRef.current.value,
        Release_Date: releaseDateRef.current.value
      }

      props.onAddMovie(movie);

   }

   return (
    <form onSubmit={addMovieHandler} className={classes.add}>
    <label>Title</label>
    <input onChange={props.onTitle} ref={titleRef} type="text"/>
    <label>Opening Text</label>
    <input onChange={props.onOpeningText} ref={openingtextRef} type="text"/>
    <label>Release Date</label>
    <input onChange={props.onReleaseDate} ref={releaseDateRef} type="date"/>
    <button>Add movie</button>
   </form>
   )
}

export default Input;