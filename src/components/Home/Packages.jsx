import Card from "./Card";

const Packages = () => {
  return (
    <div>
      <div className="text-center space-y-5 mb-5 md:mb-16 mx-10">
        <h2 className="font-medium text-2xl md:text-4xl text-secondary">
          Choose the Perfect Plan for Your Team
        </h2>
        <p>
          Select from our flexible subscription packages designed to meet the
          needs of businesses of all sizes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card
          title="Basic Plan"
          description="Perfect for startups and small businesses."
          price={5}
          list={[
            "Up to 5 team members",
            "Full asset tracking capabilities",
            "Basic reporting tools",
            "24/7 customer support",
          ]}
        ></Card>
        <Card
          title="Standard Plan"
          description="Designed to accelerate business growth."
          price={8}
          list={[
            "Up to 10 team members",
            "Advanced asset tracking",
            "Customizable reports",
            "Priority customer support",
            "24/7 customer support",
          ]}
        ></Card>
        <Card
          title="Premium Plan"
          description="The ultimate choice for scaling businesses."
          price={15}
          list={[
            "Up to 20 team members",
            "Comprehensive asset management",
            "Detailed analytics and reporting",
            "Dedicated account manager",
            "24/7 customer support",
          ]}
        ></Card>
      </div>
    </div>
  );
};

export default Packages;
