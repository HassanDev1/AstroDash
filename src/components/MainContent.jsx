import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
  Input,
  HStack,
  Icon,
  Button,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSlider,
  Heading,
} from "@chakra-ui/react";
import { Search2Icon, SunIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const MainContent = ({ data }) => {
  const [searchByPhase, setSearchByPhase] = useState([]);
  const [moonphase, setMoonphase] = useState(0.0);
  const [searchByDate, setSearcByDate] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setSearchByPhase(data);
  }, [data]);
  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearch = () => {
    const showByDate = data.filter(
      (item) => item.datetime === (date === "" ? item.datetime : date)
    );
    setSearcByDate(showByDate);

    let showByMoonPhase = searchByDate.filter(
      (item) => item.moonphase <= moonphase
    );

    setSearchByPhase(showByMoonPhase);
  };
  const moonEmoji = (moonphas) => {
    if (moonphas === 0) {
      return (
        <>
          <Text>🌑</Text>
          <Text fontSize='xs'>New Moon</Text>
        </>
      );
    } else if (moonphas < 0.25) {
      return (
        <>
          🌒
          <Text fontSize='xs'>Waxing Crescent</Text>
        </>
      );
    } else if (moonphas === 0.25) {
      return (
        <>
          🌓
          <Text fontSize='xs'>First Quarter</Text>
        </>
      );
    } else if (moonphas < 0.5) {
      return (
        <>
          🌔
          <Text fontSize='xs'>Waxing Gibbous</Text>
        </>
      );
    } else if (moonphas === 0.5) {
      return (
        <>
          🌕
          <Text fontSize='xs'>Full</Text>
        </>
      );
    } else if (moonphas < 0.75) {
      return (
        <>
          🌖
          <Text fontSize='xs'>Wanning Gibbous</Text>
        </>
      );
    } else if (moonphas === 0.75) {
      return (
        <>
          🌗
          <Text fontSize='xs'>Last Quarter</Text>
        </>
      );
    } else if (moonphas < 1.0) {
      return (
        <>
          🌘
          <Text fontSize='xs'>Waning Crescent</Text>
        </>
      );
    } else {
      return (
        <>
          <Text>🌑</Text>
          <Text fontSize='xs'>New Moon</Text>
        </>
      );
    }
  };

  return (
    <VStack>
      <HStack spacing={"8"}>
        <Input
          type='text'
          placeholder='Enter date'
          value={date}
          onChange={handleChange}
        />

        <RangeSlider
          defaultValue={[0, 100]}
          onChangeEnd={(val) => setMoonphase(val[1] / 100)}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Button colorScheme='teal' onClick={handleSearch}>
          <Icon as={Search2Icon} />
        </Button>
      </HStack>

      <TableContainer width='40vw'>
        <Table size='sm' variant='unstyled'>
          <Thead>
            <Tr>
              <Th fontSize='2xl'>Date</Th>
              <Th fontSize='2xl'>Temperature</Th>
              <Th fontSize='2xl'>Time</Th>
              <Th fontSize='2xl'>Phase</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchByPhase && searchByPhase.length > 0 ? (
              searchByPhase.map((item, id) => (
                <Tr justifyContent='center' key={id}>
                  <Td>{item.datetime}</Td>
                  <Td>{item.feelslike + " °F"}</Td>

                  <Td>{item.sunrise}</Td>

                  <Td>{moonEmoji(item.moonphase)}</Td>
                </Tr>
              ))
            ) : (
              <tr>
                <td>
                  <Heading m={"80%"}>No Data</Heading>
                </td>
              </tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default MainContent;
