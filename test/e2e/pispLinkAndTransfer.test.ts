/**
 * Perform a 3rd party link, and then use that link to initiate a transaction
 *
 */

import axios from 'axios'
import TestEnv from './TestEnv'

/* IMPORTANT
    The fido challenges found in here are signed with
    Kevin Leyow's <kevin.leyow@modusbox.com> Yubikey. If the POST /consent
    `consentId` and `scopes` ever change form you will need to derive and resign the challenges,
    update the `credential` object and update this PSA.
    Take the console output of
    `console.log('Consent is:', JSON.stringify(consentRequestsResponse.data.consent))`
    and use https://github.com/mojaloop/contrib-fido-test-ui#creating-a-test-credential
    (You will need to run this at localhost or behind https, webbrowser crypto libraries only
     work behind secure contexts)
    to sign the request and update
    `happy path - link account/link account`

    After account linking you will also need to sign the output of
    console.log('challenge from DFSP is:', initiateResponse.data.authorization.challenge)
    and update `validVerificationRequestSignedPayload` with the FIDO assertion data.
*/

const btoa = require('btoa')

const consentRequestsPost = {
  toParticipantId: 'dfspa',
  consentRequestId: 'b5d6206c-4f06-497d-af15-ed866ea6958f',
  userId: 'dfspa.username',
  authChannels: [
    'WEB',
    'OTP'
  ],
  accounts: [
    { accountNickname: 'SpeXXXXXXXXnt', address: '244431e2-7a56-40c6-814c-932631760fa9', currency: 'USD' },
    { accountNickname: 'SpeXXXXXXXXnt', address: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c', currency: 'USD' }
  ],
  actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER'],
  callbackUri: 'pisp-app://callback.com'
}

// This credential was generated by mojaloop/contrib-fido-test-ui
const linkingRequestConsentPassCredentialBody = {
  id: 'nJGhvWOzo6-bc4OTIuT9UWPmUGrzLlKbZ0ONvLPwWOEzOUr45Mov4vRWwMOYIGkGF_UTIL3nkSEug3ChycAryA',
  rawId: 'nJGhvWOzo6+bc4OTIuT9UWPmUGrzLlKbZ0ONvLPwWOEzOUr45Mov4vRWwMOYIGkGF/UTIL3nkSEug3ChycAryA==',
  response: {
    attestationObject: 'o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEYwRAIgUuRpqNZMN3IdUm4wiYfoD4eHS1fE8MBuC7SQWsp0q98CIF05dJl1nPud2BeFVqZS7fiDRaOIWdxYjn/f6SE2YWy7Y3g1Y4FZAtwwggLYMIIBwKADAgECAgkAsDkqN184ouswDQYJKoZIhvcNAQELBQAwLjEsMCoGA1UEAxMjWXViaWNvIFUyRiBSb290IENBIFNlcmlhbCA0NTcyMDA2MzEwIBcNMTQwODAxMDAwMDAwWhgPMjA1MDA5MDQwMDAwMDBaMG4xCzAJBgNVBAYTAlNFMRIwEAYDVQQKDAlZdWJpY28gQUIxIjAgBgNVBAsMGUF1dGhlbnRpY2F0b3IgQXR0ZXN0YXRpb24xJzAlBgNVBAMMHll1YmljbyBVMkYgRUUgU2VyaWFsIDkyNTUxNDE2MDBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABMFTMNvHDtXIo+uL81wHmjL95VYGTCRd9A1TWAtz6ctHkQ/vFxX3eXlocOmrXBeM65kDmMEmhalvqduGFY4j2cKjgYEwfzATBgorBgEEAYLECg0BBAUEAwUEAzAiBgkrBgEEAYLECgIEFTEuMy42LjEuNC4xLjQxNDgyLjEuNzATBgsrBgEEAYLlHAIBAQQEAwIEMDAhBgsrBgEEAYLlHAEBBAQSBBAvwFefgRNH6rEWu1qNuSAqMAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQELBQADggEBAAFpMWTkmPaIoztJD6shL1gsSPjHHImUn18Y6iJ0OWXOPjPtSl0LYlD65w4E9jzUk7qElPBwSQh3ChA9Fk7lkBJyYEM24iLMnGqJBy3u8XgnpIkfAR7FakXhfO0ge1YSZ3wlueW8zDWUzDH5S4PTqXXUvGR+Er8s3rXdL3UUAFx/9WIfquqZKke74gjbqNZ5gSW2TRZ/uO861EUqRE4UGXZY9zYODV5FFg4pIkypCFCfYG53ze48XFPUfnJPb0wq2PLoMnLM/j9RCOEua7L00O362Vu29+tdusiK1UxETqhF6u3SO68zw88xvq29VhB+IzYhpgsoKGfnIULLC9H1dr5oYXV0aERhdGFYxEmWDeWIDoxodDQXD2R2YFuP5K65ooYyx5lc87qDHZdjQQAAAAAAAAAAAAAAAAAAAAAAAAAAAECckaG9Y7Ojr5tzg5Mi5P1RY+ZQavMuUptnQ428s/BY4TM5Svjkyi/i9FbAw5ggaQYX9RMgveeRIS6DcKHJwCvIpQECAyYgASFYIEqdwNFG63wL5iYN7dGCJsWs9ebN809I2MSJMhVTGqrgIlggSHmkRWVb/cQWepnVvjeYHg9CtDsY3rRQdI8crM1TDRI=',
    clientDataJSON: 'eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiWW1JNE1ETXdOVFE0WVRCbU1EWmhaREJtTVRBMU5EZzNOVEk0TVRrMVpHWXlNVEV3T1RNeE16STBaalF3TURRek9Ea3dPRGhsTm1OaVpHWmxZV0ppTVEiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9'
  },
  type: 'public-key'
}

export const validVerificationRequestSignedPayload = {
  id: 'nJGhvWOzo6-bc4OTIuT9UWPmUGrzLlKbZ0ONvLPwWOEzOUr45Mov4vRWwMOYIGkGF_UTIL3nkSEug3ChycAryA',
  rawId: 'nJGhvWOzo6+bc4OTIuT9UWPmUGrzLlKbZ0ONvLPwWOEzOUr45Mov4vRWwMOYIGkGF/UTIL3nkSEug3ChycAryA==',
  response: {
    authenticatorData: 'SZYN5YgOjGh0NBcPZHZgW4/krrmihjLHmVzzuoMdl2MBAAAAAw==',
    clientDataJSON: 'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiVDFkYWFGbHFRWGhhVkdOM1dXcFZORmw2VW1oTmVsSnRUMWRSZDA1NlFtMWFhbXhzV2tSR2FVNXFZekpPVjFab1RYcEJNVTVIU1RGTlYxcHFXbFJvYWxwSFJtcE9SRVY1V2tSQ2JVNXRUVEpOVjBab1RWRSIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImNyb3NzT3JpZ2luIjpmYWxzZX0=',
    signature: 'MEQCIH1ZF7jLnehGV7kkSTpRXIhn/XVhLh97tIf4DxBqY7sAAiBs6XD4XHlCdaCImxEvtibEGGEHM2XjzuhGsbAiPVNcLg=='
  },
  type: 'public-key'
}

export const invalidVerificationRequest = {
  verificationRequestId: '835a8444-8cdc-41ef-bf18-ca4916c2e005',
  challenge: btoa('incorrect challenge!'),
  consentId: 'be433b9e-9473-4b7d-bdd5-ac5b42463afb',
  signedPayloadType: 'FIDO',
  signedPayload: {
    id: 'vwWPva1iiTJIk_c7n9a49spEtJZBqrn4SECerci0b-Ue-6Jv9_DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWQ',
    rawId: 'vwWPva1iiTJIk_c7n9a49spEtJZBqrn4SECerci0b-Ue-6Jv9_DZo3rNX02Lq5PU4N5kGlkEPAkIoZ3499AzWQ',
    response: {
      authenticatorData: 'SZYN5YgOjGh0NBcPZHZgW4/krrmihjLHmVzzuoMdl2MBAAAAEg==',
      clientDataJSON: 'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiZFc1cGJYQnNaVzFsYm5SbFpERXlNdyIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIxODEiLCJjcm9zc09yaWdpbiI6ZmFsc2UsIm90aGVyX2tleXNfY2FuX2JlX2FkZGVkX2hlcmUiOiJkbyBub3QgY29tcGFyZSBjbGllbnREYXRhSlNPTiBhZ2FpbnN0IGEgdGVtcGxhdGUuIFNlZSBodHRwczovL2dvby5nbC95YWJQZXgifQ==',
      signature: 'MEQCIGgRJ6e9dohkVEh4Hf9Kgzv+hCQTuBhdZ0PDGfwG4HhFAiA4++pgigae5/ao/pOBjmSR6mNbmMcPSBOw7dGwg/NGpw=='
    },
    type: 'public-key'
  }
}

describe('pispLinkAndTransfer', (): void => {
  describe('happy path - link account', (): void => {
    it('links an account', async (): Promise<void> => {
      // shortcut
      const baseUrl = TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound

      // a map of predefined ids that we will use in our test
      const ids = {
        consentRequestId: 'b5d6206c-4f06-497d-af15-ed866ea6958f',
        // this needs to be deterministic for our pre-computed credentials to work
        consentId: '2acf1dfa-ce45-486e-b19e-ae4ad9804a63'
      }

      // a map of the uris we will use for this test
      const uris = {
        linkingRequestConsent: `${baseUrl}/linking/request-consent`,
        linkingRequestConsentAuthenticate: `${baseUrl}/linking/request-consent/${ids.consentRequestId}/authenticate`,
        linkingRequestConsentPassCredential: `${baseUrl}/linking/request-consent/${ids.consentRequestId}/pass-credential`
      }

      // skip prelinking and discovery, that is tested elsewhere

      // Send initial consentRequest to the outbound PISP 3p-adapter
      const consentRequest = {
        ...consentRequestsPost,
        consentRequestId: ids.consentRequestId,
        toParticipantId: 'dfspa'
      }
      const expectedConsentsRequestResponse = {
        channelResponse: {
          scopes: [
            { actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER'], address: '244431e2-7a56-40c6-814c-932631760fa9' },
            { actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER'], address: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c' }
          ],
          callbackUri: 'pisp-app://callback.com',
          authChannels: ['OTP']
        },
        currentState: 'OTPAuthenticationChannelResponseReceived'
      }
      const consentRequestsResponse = await axios.post(uris.linkingRequestConsent, consentRequest)
      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data).toStrictEqual(expectedConsentsRequestResponse)

      // Send through an authtoken of '123456' to authenticate the user

      // dfsp simulator uses an authToken of 123456 to return a valid response
      const linkingRequestConsentAuthenticateRequest = {
        authToken: '123456'
      }
      const expectedConsentRequestAuthenticateResponse = {
        consentId: expect.any(String),
        consentRequestId: ids.consentRequestId,
        scopes: [
          { actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER'], address: '244431e2-7a56-40c6-814c-932631760fa9' },
          { actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER'], address: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c' }
        ],
        status: 'ISSUED'
      }
      const consentRequestAuthenticateResponse = await axios.patch(uris.linkingRequestConsentAuthenticate, linkingRequestConsentAuthenticateRequest)

      expect(consentRequestAuthenticateResponse.status).toEqual(200)
      expect(consentRequestAuthenticateResponse.data.currentState).toEqual('consentReceivedAwaitingCredential')
      expect(consentRequestAuthenticateResponse.data.consent).toStrictEqual(expectedConsentRequestAuthenticateResponse)

      // Print consentId for debugging purposes:
      console.log(`consentRequestId: ${ids.consentRequestId} ---> consentId: ${ids.consentId}`)
      console.log(`Consent to be signed is: ${JSON.stringify(consentRequestAuthenticateResponse.data.consent)}`)
      // The `TEST_SHOULD_OVERRIDE_CONSENT_ID` and `TEST_CONSENT_REQUEST_TO_CONSENT_MAP` should set this up for us
      expect(ids.consentId).toStrictEqual(consentRequestAuthenticateResponse.data.consent.consentId)

      // pass through the credential
      const linkingRequestConsentPassCredentialRequest = {
        credential: {
          payload: {
            ...linkingRequestConsentPassCredentialBody
          }
        }
      }
      const expectedResponse = {
        credential: {
          status: 'VERIFIED'
        },
        currentState: 'accountsLinked'
      }

      const passCredResponse = await axios.post(uris.linkingRequestConsentPassCredential, linkingRequestConsentPassCredentialRequest)
      expect(passCredResponse.status).toEqual(200)
      expect(passCredResponse.data).toEqual(expectedResponse)

      // We have a valid consent! Now let's initiate a transaction
    })
  })

  describe('happy path - initiate transfer', (): void => {
    it('sends a transfer', async (): Promise<void> => {
      // shortcut
      const baseUrl = TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound

      // a map of predefined ids that we will use in our test
      const ids = {
        transactionRequestId: 'c2470148-1be2-4c0b-aece-aa8dcb92a6cc',
        consentId: '2acf1dfa-ce45-486e-b19e-ae4ad9804a63'
      }

      // LOOKUP PHASE
      // lookup for Bob
      console.log('LOOKUP PHASE')
      const lookupRequest = {
        payee: {
          partyIdType: TestEnv.users.bob.idType,
          partyIdentifier: TestEnv.users.bob.idValue
        },
        transactionRequestId: ids.transactionRequestId
      }
      const lookupURI = `${baseUrl}/thirdpartyTransaction/partyLookup`
      const lookupResponse = await axios.post(lookupURI, lookupRequest)
      expect(lookupResponse.status).toEqual(200)
      expect(lookupResponse.data.currentState).toEqual('partyLookupSuccess')

      // INITIATE PHASE
      console.log('INITIATE PHASE')
      const expirationDate = new Date()
      expirationDate.setHours(expirationDate.getHours() + 4)

      const initiateURI = `${baseUrl}/thirdpartyTransaction/${ids.transactionRequestId}/initiate`
      const initiateRequest = {
        sourceaddress: 'dfspa.alice.1234',
        consentId: ids.consentId,
        payee: {
          partyIdInfo: {
            partyIdType: 'MSISDN',
            partyIdentifier: '987654321',
            fspId: 'dfspb'
          }
        },
        payer: {
          // this is important!
          // it tells the DFSP which consentId + source of funds account!
          partyIdType: 'THIRD_PARTY_LINK',
          // partyIdType: 'MSISDN',
          partyIdentifier: '244431e2-7a56-40c6-814c-932631760fa9',
          fspId: 'dfspa'
        },
        amountType: 'SEND',
        amount: {
          amount: '100',
          currency: 'USD'
        },
        transactionType: {
          scenario: 'TRANSFER',
          initiator: 'PAYER',
          initiatorType: 'CONSUMER'
        },
        expiration: expirationDate.toISOString()
      }

      const initiateResponse = await axios.post(initiateURI, initiateRequest)

      expect(initiateResponse.status).toEqual(200)
      expect(initiateResponse.data.currentState).toEqual('authorizationReceived')

      console.log('challenge from DFSP is:', initiateResponse.data.authorization.challenge)

      // APPROVE PHASE
      console.log('APPROVE PHASE')
      const approveURI = `${baseUrl}/thirdpartyTransaction/${ids.transactionRequestId}/approve`
      const approveRequest = {
        authorizationResponse: {
          responseType: 'ACCEPTED',
          signedPayload: {
            signedPayloadType: 'FIDO',
            fidoSignedPayload: validVerificationRequestSignedPayload
          }
        }
      }
      const approveResponse = await axios.post(approveURI, approveRequest)
      expect(approveResponse.status).toEqual(200)
      expect(approveResponse.data.currentState).toEqual('transactionStatusReceived')
      console.log('approve response:', approveResponse.data)
      expect(approveResponse.data.transactionStatus.transactionRequestState).toEqual('ACCEPTED')
    })
  })
})
