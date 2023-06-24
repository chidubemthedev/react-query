import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = async (email) => {
  const response = await axios.get(`http://localhost:3001/users/${email}`);
  const data = response.data;
  return data;
};

const fetchUserCourses = async (channelId) => {
  const response = await axios.get(
    `http://localhost:3001/channels/${channelId}`
  );
  const data = response.data;
  return data;
};

const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.channelId;
  console.log(channelId);

  const { data: channel } = useQuery(
    ["courses", channelId],
    () => fetchUserCourses(channelId),
    {
      enabled: !!channelId,
    }
  );

  const courses = channel?.data?.courses
  console.log(courses)

  return <div>DependentQueries</div>;
};

export default DependentQueries;
