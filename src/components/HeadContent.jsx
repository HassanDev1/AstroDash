import { Card, HStack, CardBody, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const HeadContent = ({ time }) => {
  return (
    <HStack>
      <Card size='lg' h='6em'>
        <CardBody>
          <Text fontWeight='bold'>Austin</Text>
        </CardBody>
      </Card>
      <Card size='lg' h='6em'>
        <CardBody>
          {time && <Text fontWeight='bold'>{time}</Text>}
          <Text fontWeight='bold'>Moon Rise</Text>
        </CardBody>
      </Card>
      <Card size='lg' h='6em'>
        <CardBody align='center' size='lg'>
          <Text fontWeight='bold'>🌘</Text>
          <Text fontWeight='bold'>Moon Phase</Text>
        </CardBody>
      </Card>
    </HStack>
  );
};

export default HeadContent;
