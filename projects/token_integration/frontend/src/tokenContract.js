import { ethers } from 'ethers'
import contractArtifact from '../../hardhat/artifacts/contracts/MyToken.sol/MyToken.json' assert { type: "json" }

let Contract;
const provider = new ethers.BrowserProvider(window.ethereum)

export const bind = (address) => {
  Contract = new ethers.Contract(
    address,
    contractArtifact.abi,
    provider
  )
}

export const totalSupply = async () => {
  return await Contract.totalSupply()
}

export const balanceOf = async (address) => {
  return await Contract.balanceOf(address)
}

export const transfer = async (to, amount) => {
  try {
    const signer = await provider.getSigner()
    const tx = await Contract.connect(signer).transfer(to, amount)
    await tx.wait()
    console.log(`Transferred ${amount} tokens to ${to}. Tx hash: ${tx.hash}`)



    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0x5fbdb2315678afecb367f032d93f642f64180aa3', // Адрес токена в виде строки
          symbol: 'MTK', // Символ токена
          decimals: 18, // Количество десятичных знаков
          image: 'URL_TO_YOUR_TOKEN_IMAGE' // URL изображения токена (если имеется)
        },
      },
    });

  if (wasAdded) {
    console.log("Thanks for your interest!");
  } else {
    console.log("Your loss!");
  }



  } catch (error) {
    console.error('Error transferring:', error.message)
  }
}
