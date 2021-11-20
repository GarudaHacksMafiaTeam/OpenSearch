import FeedCard from 'components/feeds/FeedCard'

const OpenSourceProfile = () => {
  return (
    <>
      {
        [1, 2, 3, 4, 5, 6].map(x => <FeedCard key={x} id={x} />)
      }
    </>
  );
}

export default OpenSourceProfile;
