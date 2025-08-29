import CatCard from "../les-3/CatCard";
import Test from "../les-3/Test";
import cats from "../les-3/cats.json";

const App = () => {
  return (
    <div>
      <div className="card">Some asdasd</div>
      <Test />
      <Test />
      <Test />

      <hr />
      <hr />
      <ul>
        {cats.map((cat) => (
          //   <CatCard
          //     name={cat.name}
          //     age={cat.age}
          //     imgUrl={cat.image}
          //     available={cat.available}
          //   />
          <CatCard cat={cat} key={cat.id} />
        ))}
      </ul>
    </div>
  );
};

export default App;

// const Comp = () => {
//   return (
//     <>
//       <p>123</p>
//       <p>qwe</p>
//     </>
//   )
//  }

// const somefn = () => {
//   return 10 20
//  }
