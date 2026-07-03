export function Practice() {
  const number = [1, 2, 3, 4, 5];
  const double = number.map((num) => num * 2);
  const fruitList = ["Apple", "Banana", "Cherry"];

  //spread operator
  const dairyProducts = ["Milk", "Cheese", "Yogurt"];
  const allProducts = [...fruitList, ...dairyProducts];
  return (
    <>
      <section id="center">
        {double}
        {allProducts.map((p, index) => (
          <nav>
            <ul key={index + 1}>
              <li>{p}</li>
            </ul>
          </nav>
        ))}
      </section>
    </>
  );
}
