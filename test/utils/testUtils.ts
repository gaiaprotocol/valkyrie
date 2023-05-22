import { BigNumber, BigNumberish, utils, BytesLike } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { solidityKeccak256, solidityPack, defaultAbiCoder } = utils;

export const TokenType = {
    ETH: 0,
    ERC20: 1,
    ERC1155: 2,
    ERC721: 3,
};

export const ETH = TokenType.ETH;
export const ERC20 = TokenType.ERC20;
export const ERC1155 = TokenType.ERC1155;
export const ERC721 = TokenType.ERC721;

export const hhChainId = 31337;

export const toBytes2 = (rate: number) => {
    return utils.hexZeroPad(rate as any, 2);
};

export interface cSigs {
    _vs: BytesLike;
    r: BytesLike;
}

export interface TokenInfo {
    token: BytesLike;
    isTransferType: boolean;
}

export interface TokenDataToBeBridged {
    tokenType: Number;
    tokenName: string;
    tokenAddress: BytesLike;
    ids: BigNumberish[];
    amounts: BigNumberish[];
}

export const getOpSigs = async (signers: SignerWithAddress[], type: string, addressThis: string, params: any[], nonce: number, sorting: boolean) => {
    let hash;
    if (type == "updateQuorum") {
        hash = utils.arrayify(solidityKeccak256(["string", "uint256", "address", "uint48", "uint48"], [type, hhChainId, addressThis, params[0], nonce]));
    } else if (type == "setPause") {
        hash = utils.arrayify(solidityKeccak256(["string", "uint256", "address", "bool", "uint48"], [type, hhChainId, addressThis, params[0], nonce]));
    } else if (type == "updateFeeDB") {
        hash = utils.arrayify(solidityKeccak256(["string", "uint256", "address", "address", "uint48"], [type, hhChainId, addressThis, params[0], nonce]));
    } else if (type == "emergencyWithdrawTokens") {
        const tupleType: any = {
            type: "tuple[]",
            components: [
                { name: "tokenType", type: "uint8" },
                { name: "tokenName", type: "string" },
                { name: "tokenAddress", type: "address" },
                { name: "ids", type: "uint256[]" },
                { name: "amounts", type: "uint256[]" },
            ],
        };
        const _tokenData = defaultAbiCoder.encode([tupleType], [params[0]]);

        hash = utils.arrayify(
            solidityKeccak256(["string", "uint256", "address", "bytes", "address", "uint48"], [type, hhChainId, addressThis, _tokenData, params[1], nonce])
        );
    } else if (type == "setTokenInfo") {
        hash = utils.arrayify(
            solidityKeccak256(
                ["string", "uint256", "address", "bytes32[]", "address[]", "bool[]", "uint48"],
                [type, hhChainId, addressThis, params[0], params[1], params[2], nonce]
            )
        );
    } else if (type == "manualDiscount") {
        hash = utils.arrayify(solidityKeccak256(["string", "uint256", "address", "bytes", "uint48"], [type, hhChainId, addressThis, params[0], nonce]));
    } else if (type == "setTokenAddresses") {
        hash = utils.arrayify(
            solidityKeccak256(["string", "uint256", "address", "bytes32[]", "address[]", "uint48"], [type, hhChainId, addressThis, params[0], params[1], nonce])
        );
    } else {
        hash = utils.arrayify(solidityKeccak256(["string", "uint256", "address", "address", "uint48"], [type, hhChainId, addressThis, params[0], nonce]));
    }

    return await hashToSigs(signers, hash, sorting);
};

export const hashToSigs = async (signers: SignerWithAddress[], hash: BytesLike, sorting: boolean) => {
    let sigs: cSigs[] = [];

    if (sorting) signers.sort((a, b) => (BigNumber.from(a.address).lt(b.address) ? -1 : 1));

    for (const signer of signers) {
        const sig = await signer.signMessage(hash);
        const sSig = utils.splitSignature(sig);
        sigs.push({ _vs: sSig._vs, r: sSig.r });
    }

    return sigs;
};

export const getReceiveETHSigs = async (
    signers: SignerWithAddress[],
    addressThis: string,
    fromChainId: BigNumberish,
    sender: string,
    receiver: string,
    amount: BigNumberish,
    sendingId: BigNumberish,
    sorting: boolean
) => {
    const hash = utils.arrayify(
        solidityKeccak256(
            ["address", "uint256", "address", "uint256", "address", "uint256", "uint256"],
            [addressThis, fromChainId, sender, hhChainId, receiver, amount, sendingId]
        )
    );

    return await hashToSigs(signers, hash, sorting);
};

export const getReceiveTokenSigs = async (
    signers: SignerWithAddress[],
    addressThis: string,
    fromChainId: BigNumberish,
    sender: string,
    receiver: string,
    tokenData: TokenDataToBeBridged,
    sendingId: BigNumberish,
    sorting: boolean,
    feeData: BytesLike = "0x"
) => {
    const _tokenData = solidityPack(
        ["uint8", "string", "address", "uint256[]", "uint256[]"],
        [tokenData.tokenType, tokenData.tokenName, tokenData.tokenAddress, tokenData.ids, tokenData.amounts]
    );
    const hash = utils.arrayify(
        solidityKeccak256(
            ["address", "uint256", "address", "uint256", "address", "bytes", "uint256", "bytes"],
            [addressThis, fromChainId, sender, hhChainId, receiver, _tokenData, sendingId, feeData]
        )
    );

    return await hashToSigs(signers, hash, sorting);
};
