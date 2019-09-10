const uuidv4 = require('uuid/v4');

export default uuidv4({ rng: uuidv4.nodeRNG });
