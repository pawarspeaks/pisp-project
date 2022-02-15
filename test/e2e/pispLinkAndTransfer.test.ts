/**
 * Perform a 3rd party link, and then use that link to initiate a transaction
 * 
 */

import axios from "axios"
import TestEnv from "./TestEnv"

const btoa = require('btoa')

const consentRequestsPost = {
  toParticipantId: 'dfspa',
  userId: 'dfspa.username',
  consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
  authChannels: [
    'WEB',
    'OTP'
  ],
  accounts: [
    { accountNickname: 'SpeXXXXXXXXnt', id: '244431e2-7a56-40c6-814c-932631760fa9', currency: 'USD' },
    { accountNickname: 'SpeXXXXXXXXnt', id: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c', currency: 'USD' }
  ],
  actions: ['accounts.getBalance', 'accounts.transfer'],
  callbackUri: 'pisp-app://callback.com'
}

// This credential was generated by mojaloop/contrib-fido-test-ui
const linkingRequestConsentPassCredentialBody = {
  "id": "DVFXZuLI5po4eDNPCH7Vtrjan5h-yGxeAUzS3QH3uMAP8O-7xg0AObz0mdTRy7veAflN201NlqoI-lByRug5ow",
  "rawId": "DVFXZuLI5po4eDNPCH7Vtrjan5h+yGxeAUzS3QH3uMAP8O+7xg0AObz0mdTRy7veAflN201NlqoI+lByRug5ow==",
  "response": {
    "attestationObject": "o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEcwRQIhAJ/3xIiXAdSa6Dhl5Jx85u1sg7Sfy9Qz//PcuNKa80d2AiBPB+UCpuhM+Lt4AhvYyXpMKAcoyGSPIfUfCMqwkFj6wGN4NWOBWQLBMIICvTCCAaWgAwIBAgIECwXNUzANBgkqhkiG9w0BAQsFADAuMSwwKgYDVQQDEyNZdWJpY28gVTJGIFJvb3QgQ0EgU2VyaWFsIDQ1NzIwMDYzMTAgFw0xNDA4MDEwMDAwMDBaGA8yMDUwMDkwNDAwMDAwMFowbjELMAkGA1UEBhMCU0UxEjAQBgNVBAoMCVl1YmljbyBBQjEiMCAGA1UECwwZQXV0aGVudGljYXRvciBBdHRlc3RhdGlvbjEnMCUGA1UEAwweWXViaWNvIFUyRiBFRSBTZXJpYWwgMTg0OTI5NjE5MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIRpvsbWJJcsKwRhffCrjqLSIEBR5sR7/9VXgfZdRvSsXaiUt7lns44WZIFuz6ii/j9f8fadcBUJyrkhY5ZH8WqNsMGowIgYJKwYBBAGCxAoCBBUxLjMuNi4xLjQuMS40MTQ4Mi4xLjEwEwYLKwYBBAGC5RwCAQEEBAMCBDAwIQYLKwYBBAGC5RwBAQQEEgQQFJogIY72QTOWuIH41bfx9TAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4IBAQA+/qPfPSrgclePfgTQ3VpLaNsBr+hjLhi04LhzQxiRGWwYS+vB1TOiPXeLsQQIwbmqQU51doVbCTaXGLNIr1zvbLAwhnLWH7i9m4ahCqaCzowtTvCQ7VBUGP5T1M4eYnoo83IDCVjQj/pZG8QYgOGOigztGoWAf5CWcUF6C0UyFbONwUcqJEl2QLToa/7E8VRjm4W46IAUljYkODVZASv8h3wLROx9p5TSBlSymtwdulxQe/DKbfNSvM3edA0up+EIJKLOOU+QTR2ZQV46fEW1/ih6m8vcaY6L3NW0eYpc7TXeijUJAgoUtya/vzmnRAecuY9bncoJt8PrvL2ir2kDaGF1dGhEYXRhWMTLX5kZhaUsGGUVJvPd6efRKHVvWMqnrf4u23AvlzDddEEAAAAAAAAAAAAAAAAAAAAAAAAAAABADVFXZuLI5po4eDNPCH7Vtrjan5h+yGxeAUzS3QH3uMAP8O+7xg0AObz0mdTRy7veAflN201NlqoI+lByRug5o6UBAgMmIAEhWCDD5L66Sy7QEkshHkp0OFDNNd7Yj3VcW9iULwYva/VlVCJYIFk/fr99IJ2zL1dYGgTvNpF/3daUxWYBMr556Dc7K4i1",
    "clientDataJSON": "eyJjaGFsbGVuZ2UiOiJabU16TVRWa1l6WXlOV0ppTUdKaU1EQXdNamxsTnpBMlpHVTNaak00WldWa09UaGtZek0zTUdOa016ZzJNamd4WkdVME5tRTBNemhpT0RBNE1HVTFOdyIsImNsaWVudEV4dGVuc2lvbnMiOnt9LCJoYXNoQWxnb3JpdGhtIjoiU0hBLTI1NiIsIm9yaWdpbiI6Imh0dHBzOi8vc2FuZGJveC5tb2phbG9vcC5pbyIsInR5cGUiOiJ3ZWJhdXRobi5jcmVhdGUifQ=="
  },
  "type": "public-key"
}

export const validVerificationRequestSignedPayload = {
  "id": "DVFXZuLI5po4eDNPCH7Vtrjan5h-yGxeAUzS3QH3uMAP8O-7xg0AObz0mdTRy7veAflN201NlqoI-lByRug5ow",
  "rawId": "DVFXZuLI5po4eDNPCH7Vtrjan5h+yGxeAUzS3QH3uMAP8O+7xg0AObz0mdTRy7veAflN201NlqoI+lByRug5ow==",
  "response": {
    "authenticatorData": "y1+ZGYWlLBhlFSbz3enn0Sh1b1jKp63+LttwL5cw3XQBAAAAIw==",
    "clientDataJSON": "eyJjaGFsbGVuZ2UiOiJUMWRhYUZscVFYaGFWR04zV1dwVk5GbDZVbWhOZWxKdFQxZFJkMDU2UW0xYWFteHNXa1JHYVU1cVl6Sk9WMVpvVFhwQk1VNUhTVEZOVjFwcVdsUm9hbHBIUm1wT1JFVjVXa1JDYlU1dFRUSk5WMFpvVFZFIiwiY2xpZW50RXh0ZW5zaW9ucyI6e30sImhhc2hBbGdvcml0aG0iOiJTSEEtMjU2Iiwib3JpZ2luIjoiaHR0cHM6Ly9zYW5kYm94Lm1vamFsb29wLmlvIiwidHlwZSI6IndlYmF1dGhuLmdldCJ9",
    "signature": "MEQCIEonIaMwgHySe/1apQScRxp8GjFNwy9Ajykus3pVWX15AiAUIywSDZWWACclQ0ue47QbkTPb62zg1sR8uY9pNHG6jA=="
  },
  "type": "public-key"
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

describe('pispLinkAndTransfer', () => {
  describe('happy path - link account', () => {
    it('links an account', async () => {
      //shortcut
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
            { actions: ['accounts.getBalance', 'accounts.transfer'], accountId: '244431e2-7a56-40c6-814c-932631760fa9' },
            { actions: ['accounts.getBalance', 'accounts.transfer'], accountId: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c' }
          ],
          callbackUri: 'pisp-app://callback.com',
          authChannels: ['OTP'],
          consentRequestId: ids.consentRequestId,
        },
        currentState: 'OTPAuthenticationChannelResponseRecieved'
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
          { actions: ['accounts.getBalance', 'accounts.transfer'], accountId: '244431e2-7a56-40c6-814c-932631760fa9' },
          { actions: ['accounts.getBalance', 'accounts.transfer'], accountId: '6b6e6d77-dbf4-423f-abd5-bc5854e4ab1c' }
        ]
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

  describe('happy path - initiate transfer', () => {
    it('sends a transfer', async () => {
      //shortcut
      const baseUrl = TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound

      // a map of predefined ids that we will use in our test
      const ids = {
        transactionRequestId: 'c2470148-1be2-4c0b-aece-aa8dcb92a6cc',
        consentId: '2acf1dfa-ce45-486e-b19e-ae4ad9804a63'
      }

      
      // LOOKUP PHASE
      // lookup for Bob
      console.log("LOOKUP PHASE")
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
      console.log("INITIATE PHASE")
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 4);

      const initiateURI = `${baseUrl}/thirdpartyTransaction/${ids.transactionRequestId}/initiate`
      const initiateRequest = {
        sourceAccountId: 'dfspa.alice.1234',
        consentId: ids.consentId,
        payee: {
          partyIdInfo: {
            partyIdType: 'MSISDN',
            partyIdentifier: '987654321',
            fspId: 'dfspb'
          },
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

      console.log("challenge from DFSP is:", initiateResponse.data.authorization.challenge)

      // APPROVE PHASE
      console.log('APPROVE PHASE')
      const approveURI = `${baseUrl}/thirdpartyTransaction/${ids.transactionRequestId}/approve`
      const approveRequest = {
        authorizationResponse: {
          signedPayloadType: 'FIDO',
          signedPayload: validVerificationRequestSignedPayload
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