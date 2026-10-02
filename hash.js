function hash(key) {

}

class HashMap {

    // The buckets that holds the key and value, and if necessary a link to the next node.
    buckets = [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
    ]
    loadFactor = 0.75
    hash(key){
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber* hashCode + key.charCodeAt(i)
            hashCode = hashCode % this.buckets.length
        }
        return hashCode;
    }


    //The logic behind getting something a next value, if needed.
    #linkedLinks(index,key,value){
       if (!index.next) {
        index.next = {
            key: key,
            value: value
        }
       } else {
        this.#linkedLinks(index.next,key,value)
       }
    }

    set(key,value){
        let CurrentKey = this.hash(key)

        // If the value is over the length of buckets, we throw an error

        if (CurrentKey < 0  || CurrentKey >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds")
        }

        // Checks if the bucket actually has any key in it
        if (!this.buckets[CurrentKey].key) {
            this.buckets[CurrentKey].key = key
            this.buckets[CurrentKey].value = value
        } else if (this.buckets[CurrentKey].key === key) {
            this.buckets[CurrentKey].value = value
        } else {
        // If the current bucket already has a key, it will create a link and a node,
        // for the next pair.
            this.#linkedLinks(this.buckets[CurrentKey],key,value)
        }
    }

    #getLink(index,key){
        if (index.next.key === key) {
            return index.next.value
        } else if (index.next === undefined) {
            return undefined
        } else {
            return this.#getLink(index.next,key)
        }
    }

    get(key){
        let currentKey = this.hash(key)
        if (this.buckets[currentKey].key === key) {
            return this.buckets[currentKey].value
        } if (this.buckets[currentKey].next) {
            return this.#getLink(this.buckets[currentKey],key)
        } else {
            return undefined
        }
    }
}

let test = new HashMap
test.set("Rama","Chocolate")
test.set("Sita","Bread")
console.log(test.get("Cake"))
test.set("Cake","Apple")
console.log(test.get("Cake"))
