import { AttestationResult, EvmChains, SignProtocolClient, SpMode, OffChainSignType, IndexService } from "@ethsign/sp-sdk";

import axios from "axios";
import { WalletClient } from "viem";
import { privateKeyToAccount } from 'viem/accounts';
const privateKey = '0xabc'; // optional


// const client = new SignProtocolClient(SpMode.OffChain, {
//   signType: OffChainSignType.EvmEip712,
//   account: privateKeyToAccount(privateKey), // optional
// });

//create schema
// const schemaInfo = await client.createSchema({
//   name: 'xxx',
//   data: [{ name: 'name', type: 'string' }],
// });

export default class SignClient {
    private readonly signClient: SignProtocolClient;

    constructor(walletClient: WalletClient) {
        this.signClient = new SignProtocolClient(SpMode.OnChain, {
            chain: EvmChains.sepolia,
            walletClient: walletClient,
        });
    }

    async createSchema(schemaId: string, schemaData: Array<{ name: string, type: string }>): Promise<any> {
        try {
            // Call the Sign Protocol client to create a schema
            const response = await this.signClient.createSchema({
                schemaId: schemaId,
                data: schemaData,
            });
    
            // Return response if successful
            return {
                success: true,
                schemaId: response.schemaId, // Return the schema ID
                message: 'Schema created successfully',
            };
        } catch (e) {
            console.log("failure reason")
            console.log(e)
            console.error(e);
            return {
                success: false,
                message: 'Schema creation failed',
            };
        }
    }
    
    
    async createAttestation(address: string): Promise<AttestationResult> {
        try {
            const response = await this.signClient.createAttestation({
                schemaId: "0x65",
                data: {
                    signer: address,
                },
                indexingValue: address,
            });

            return response;
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    async revokeAttestation(attestationId: string, reason: string) {
        try {
            // Revoke the attestation by its ID
            const response = await this.signClient.revokeAttestation({
                attestationId: attestationId,
                reason: reason,  // The reason for revocation
            });
    
            return {
                success: true,
                message: 'Attestation revoked successfully',
            };
        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: 'Failed to revoke attestation',
            };
        }
    }

    
    async fetchAccountAttestations(address: string) {
        try {
            const response = await this.makeSignProtocolRequest("index/attestations", {
                method: "GET",
                params: {
                    mode: "onchain",
                    schemaId: "onchain_evm_11155111_0x65",
                    attester: address,
                    indexingValue: address,
                },
            });

            // Make sure the request was successfully processed.
            if (!response.success) {
                return {
                    success: false,
                    message: response?.message ?? "Attestation query failed.",
                };
            }

            // Return a message if no attestations are found.
            if (response.data?.total === 0) {
                return {
                    success: false,
                    message: "No attestation for this address found.",
                };
            }

            // Return all attestations that match our query.
            return {
                success: true,
                attestations: response.data.rows,
            };
        } catch (e) {
            throw e;
        }
    }

    async getSchemaListFromIndexService(page: number = 1): Promise<any> {
        try {
            const indexService = new IndexService('testnet');
            const response = await indexService.querySchemaList({ page });
    
            // Return response if successful
            return {
                success: true,
                schemaList: response.data, // Assuming response.data contains the schema list
                message: 'Schema list retrieved successfully',
            };
        } catch (e) {
            console.log("failure reason");
            console.log(e);
            console.error(e);
            return {
                success: false,
                message: 'Failed to retrieve schema list',
            };
        }
    }

    
    async getSchemaFromIndexService(schemaId: string): Promise<any> {
        try {
            const indexService = new IndexService('testnet');
            const response = await indexService.querySchema(schemaId);
    
            // Return response if successful
            return {
                success: true,
                schema: response.data, // Assuming response.data contains the schema details
                message: 'Schema retrieved successfully',
            };
        } catch (e) {
            console.log("failure reason");
            console.log(e);
            console.error(e);
            return {
                success: false,
                message: 'Failed to retrieve schema',
            };
        }
    }

    async getAttestationListFromIndexService(page: number = 1): Promise<any> {
        try {
            const indexService = new IndexService('testnet');
            const response = await indexService.queryAttestationList({ page });
    
            // Return response if successful
            return {
                success: true,
                attestationList: response.data, // Assuming response.data contains the attestation list
                message: 'Attestation list retrieved successfully',
            };
        } catch (e) {
            console.log("failure reason");
            console.log(e);
            console.error(e);
            return {
                success: false,
                message: 'Failed to retrieve attestation list',
            };
        }
    }

    async getAttestationFromIndexService(attestationId: string): Promise<any> {
        try {
            const indexService = new IndexService('testnet');
            const response = await indexService.queryAttestation(attestationId);
    
            // Return response if successful
            return {
                success: true,
                attestation: response.data, // Assuming response.data contains the attestation details
                message: 'Attestation retrieved successfully',
            };
        } catch (e) {
            console.log("failure reason");
            console.log(e);
            console.error(e);
            return {
                success: false,
                message: 'Failed to retrieve attestation',
            };
        }
    }
        

    
    
    private async makeSignProtocolRequest(endpoint: string, options: any) {
        const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
        const res = await axios.request({
            url,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            ...options,
        });
        // Throw API errors
        if (res.status !== 200) {
            throw new Error(JSON.stringify(res));
        }

        return res.data;
    }
}