import React from 'react';
import RequestCard from 'components/opensource/RequestCard';

const OpenSourceProfile = () => {
  const requestData = [
    {
      name: "Malik",
      description: "What a great open source! hope it will get big soon enough",
      content: "Welcome dear open source enthusiast! We are here to support you <3. Enjoy our platform and share your open sources!",
      image: "https://picsum.photos/200",
    },
    {
      name: "Azhar",
      description: "You guys did such a great job!",
      content: "prisma:query SELECT `open-search`.`Comment`.`id`, `open-search`.`Comment`.`createdAt`, `open-search`.`Comment`.`content`, `open-search`.`Comment`.`feedId`, `open-search`.`Comment`.`userId` FROM `open-search`.`Comment` WHERE `open-search`.`Comment`.`feedId` IN (?)",
      image: "https://picsum.photos/200",
    },
  ];

  return (
    <>
      {requestData.map((feed, index) => (
        <RequestCard
          id={index}
          description={feed.description}
          content={feed.content}
          key={index}
          name={feed.name}
          image={feed.image}
        />
      )
      )}
    </>
  );
}

export default OpenSourceProfile;
