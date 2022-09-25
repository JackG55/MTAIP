import { ethers } from 'ethers';

function isAuthenticated() {
    const { ethereum } = window;
    if (ethereum) {
        var provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = provider.listAccounts();
        if(accounts.length > 0 )
        {
            return true
        }
        else
        {
            return false
        }
    }
}

export default isAuthenticated;
