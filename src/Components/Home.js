import { Card } from "./Context";

function Home() {
  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="Bank without the pranks."
      title="Welcome to Bad Bank!"
      text="We're here to help you suceed with all your banking needs."
      body={<img src="bank.png" className="img-fluid" alt="Responsive image" />}
    />
  );
}

export default Home;
