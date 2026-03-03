import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {

    const { data: blogs, isPending, error } = useFetch('blogs');

    return ( 
        <div className="home">
            <h3>{error && <div>{error}</div>}</h3>
            {isPending && <div>Data is loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
            
            {
            /* Uncomment for debugging purposes
            {console.log(blogs)} */
            }
        </div>
     );
}
 
export default Home;