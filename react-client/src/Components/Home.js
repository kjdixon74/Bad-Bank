import { Card } from "./Context";

function Home() {
  return (
    <Card
      header="Bank without the pranks."
      title="Welcome to Bad Bank!"
      text="We're here to help you suceed with all your banking needs."
      body={<img src="bank.png" className="img-fluid" alt="bank" />}
    />
  );
}

export default Home;
