import Layout from 'components/opensource/Layout'
import TaskBlock from 'components/opensource/TaskBlock'
import Head from 'next/head'

const Task = () => {
  return (
    <>
      <Head>
        <title>Feeds | OpenSearch</title>
      </Head>
      {[1, 2, 3].map((x, index) => <TaskBlock key={index} id={x} />)}
    </>
  );
}

export default Task;
