export default function App (){
  return {
    <div>
      <input placeholder="Enter Post Title"/>
    </div>
 }
}
{
  Data.map((post) => (
    <div key={post.id}>
      <p>{post.title}</p>
      <p>{post.author}</p>
    </div>
  ));
}