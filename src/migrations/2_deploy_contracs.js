const MTAIP = artifacts.require('MTAIP')

module.exports = async function (deployer) {

const BASEURI = `https://bafybeidfpvjszubegtoomoknmc7zcqnay7noteadbwxktw46guhdeqohrm.ipfs.infura-ipfs.io/`

await deployer.deploy(MTAIP, 'MTAIP', 'MTA', BASEURI)

}