import { useState, useEffect } from 'react';

export enum CryptoType {
    BTC = 'BTC',
    ETH = 'ETH',
    SOL = 'SOL',
    XMR = 'XMR',
}

export type TokenPair = `${CryptoType}-USD`;

export interface TokenData {
    price: number;
    priceChange: number;
}

const createTokenPair = (crypto: CryptoType): TokenPair => `${crypto}-USD` as TokenPair;

const tokenPairs: TokenPair[] = [
    createTokenPair(CryptoType.BTC),
    createTokenPair(CryptoType.ETH),
    createTokenPair(CryptoType.SOL),
    createTokenPair(CryptoType.XMR),
];

export const useCryptoPrices = () => {
    // Use a single state object to store all token data
    const [tokensData, setTokensData] = useState<Record<TokenPair, TokenData>>({} as Record<TokenPair, TokenData>);

    useEffect(() => {
        // set up a web socket connection to the server
        const ws = new WebSocket(
            'wss://data-streamer.cryptocompare.com/'
        );
        ws.onopen = () => {
            // Dynamically subscribe to all token pairs
            tokenPairs.forEach(pair => {
                ws.send(
                    JSON.stringify({
                        action: "SUBSCRIBE",
                        type: "index_cc_v1_latest_tick",
                        groups: ["VALUE", "LAST_UPDATE", "MOVING_24_HOUR"],
                        market: "cadli",
                        instruments: [pair]
                    })
                );
            });
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.TYPE === '1101' && data.INSTRUMENT) {
                const instrument = data.INSTRUMENT as TokenPair;

                // Update the token data in state
                setTokensData(prevData => ({
                    ...prevData,
                    [instrument]: {
                        price: data.VALUE || 0,
                        priceChange: data.MOVING_24_HOUR_CHANGE_PERCENTAGE || 0
                    }
                }));
            }
        };

        return () => {
            // close the web socket connection when the component unmounts
            if (ws) {
                ws.close();
            }
        };
    }, []); // Re-run effect if tokenPairs changes

    return { tokensData, tokenPairs };
};

