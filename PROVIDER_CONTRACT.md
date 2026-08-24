# Provider Adapter Contract

A real video provider adapter should implement:

createJob(scene): Promise<{providerJobId:string}>
getJob(providerJobId): Promise<{status:'queued'|'rendering'|'processing'|'ready'|'failed',progress:number,previewUrl?:string,finalUrl?:string,error?:string}>
cancelJob(providerJobId): Promise<void>

The provider must accept the scene prompt and reference assets without changing the scene's identity/continuity data.
