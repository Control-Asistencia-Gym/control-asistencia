import { Card, Text } from "@nextui-org/react";

export const Sidebar = () => {
  return (
    <Card css={{minHeight: 'calc(100vh - 5rem)'}}>
      <Card.Body>
        <Text>A basic card</Text>
      </Card.Body>
    </Card>
  );
};
