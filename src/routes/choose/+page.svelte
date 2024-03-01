<script>
    import {setCurrentSessionStore} from '$lib/stores/currentSessionStore'
    import {currentSessionTypes} from '$lib/utils/constants'
    import { goto } from '$app/navigation';;

    const setCurrentSession = (actingAs) => {
        setCurrentSessionStore(actingAs)
        goto("/abc")
    }
</script>

<h1>You are a</h1>
<div>
    <button on:click={()=>setCurrentSession(currentSessionTypes.h)}>Host</button>
</div>

<div>
    <button on:click={()=>setCurrentSession(currentSessionTypes.p)}>Participant</button>
</div>