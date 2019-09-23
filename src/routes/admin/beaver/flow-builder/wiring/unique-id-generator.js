import uuidv4 from 'uuid/v4';

const IdGenerator = () => uuidv4({ rng: uuidv4.nodeRNG });

export default IdGenerator;
