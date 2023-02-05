import classes from './Input.module.css';

const Input = (props) => {
   return (
    <form className={classes.add}>
    <label>Title</label>
    <input onChange={props.onTitle} type="text"/>
    <label>Opening Text</label>
    <input onChange={props.onOpeningText} type="text"/>
    <label>Release Date</label>
    <input onChange={props.onReleaseDate} type="date"/>
    <button onClick={props.onAddMovie} type="submit">Add movie</button>
   </form>
   )
}

export default Input;