class Node{
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList{
    constructor(){
        this.listHead = null;
    };

    prepend(key, value){
        let temp = null;

        if(this.listHead != null) temp = this.listHead;

        this.listHead = new Node(key, value);
        this.listHead.nextNode = temp;
    }

    append(key, value){
        if(this.listHead == null) this.prepend(key, value);
        else {
            let temp = this.listHead;

            while(temp.nextNode != null) temp = temp.nextNode;

            temp.nextNode = new Node(key, value);
        }
    }

    size(){
        if(this.listHead == null) return 0;
        else {
            let temp = this.listHead;
            let counter = 0;

            while(temp.nextNode != null){
                counter += 1;
                temp = temp.nextNode;
            }

            return counter += 1;
        }
    }

    head(){
        return this.listHead;
    }

    tail(){
        let temp = this.listHead;

        while (temp.nextNode != null){
            temp = temp.nextNode
        }
        
        return temp;
    }

    at(index){
        if(index == 1) return this.listHead;
        else {
            let temp = this.listHead;
            let counter = 1;

            while(index > counter){
                counter += 1;
                temp = temp.nextNode;
            }

            return temp != null ? temp : 'Error - Not enough nodes in list';
        }
    }

    pop(){
        let temp = this.listHead;
        let tempPrior; 

        while(temp.nextNode != null){
            tempPrior = temp;
            temp = temp.nextNode; 
        }

        tempPrior.nextNode = null;
    }

    contains(value){
        let temp = this.listHead;

        while(temp != null){
            if(temp.value == value){
                return true;
            }

            temp = temp.nextNode;
        }

        return false;
    }

    find(value){
        let temp = this.listHead;
        let counter = 1;

        while(temp != null){
            if(temp.value == value){
                return counter;
            }

            counter += 1;
            temp = temp.nextNode;
        }

        return null;
    }

    toString(){
        if(this.listHead == null) return 'null';
        else {
            let string = '';
            let temp = this.listHead;

            while(temp.nextNode != null){
                string += `( ${temp.value} ) -> `;
                temp = temp.nextNode;
            }

            string += `( ${temp.value} ) -> null`;

            return string;
        }
    }

    insertAt(value, index){
        let formerNode = this.at(index - 1);
        let newNode = new Node(value);
        let latterNode = this.at(index);

        formerNode.nextNode = newNode;
        newNode.nextNode = latterNode;
    }

    removeAt(index){
        let formerNode = this.at(index - 1);
        let latterNode = this.at(index + 1);

        formerNode.nextNode = latterNode;
    }

}

class HashMap {
    constructor(){
        this.buckets = Array.from({length: 16}, () => new LinkedList());
        this.loadFactor = 0.75;
        this.capacity = this.buckets.length;
        this.occupied = 0;
    }

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    } 

    set(key, value){
        let hashedKey = this.hash(key);
        let bucket = this.buckets[hashedKey];
        
        if(bucket.head()){
            bucket.head().nextNode = new Node(key, value);
        } else {
            bucket.append(key, value);
            this.occupied += 1;
        }
    }

    get(key){
        let hashedKey = this.hash(key);

        if(this.buckets[hashedKey].head()){
            let temp = this.buckets[hashedKey].listHead;

            while(temp != null){
                if(temp.key == key){
                    return temp.value;
                }

                temp = temp.nextNode;
            }
        }

        return null;
    }

    has(key){
        let hashedKey = this.hash(key);

        if(this.buckets[hashedKey].head()){
            let temp = this.buckets[hashedKey].listHead;

            while(temp != null){
                if(temp.key == key){
                    return true;
                }

                temp = temp.nextNode;
            }
        }

        return false;
    }

    remove(key){
        let hashedKey = this.hash(key);
        let bucket = this.buckets[hashedKey];

        if(bucket.head()){
            let temp = bucket.listHead;
            let tempPrior;
            let counter = 1;

            while(temp != null){
                if(temp.key == key){
                    if(counter < 2){
                        bucket.listHead = null;
                        this.occupied -= 1;
                        return true;
                    } else{
                        tempPrior.nextNode = temp.nextNode;
                        return true;
                    }
                }

                tempPrior = temp;
                temp = temp.nextNode;
                counter += 1;
            }
        }

        return false;
    }

    length(){
        let arr = this.buckets;
        let counter = 0;

        for(let i = 0; i < arr.length; i++){
            counter += arr[i].size();
        }

        return `hashmap contains ${counter} nodes`;
    }

    clear(){
        for (let bucket of this.buckets) bucket.listHead = null;
        this.occupied = 0;
    }

    keys(){
        let keyArr = [];

        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i].head()){
                let temp = this.buckets[i].listHead;

                while(temp != null){
                    keyArr.push(temp.key);

                    temp = temp.nextNode;
                }
            }
        }

        return keyArr;
    }

    values(){
        let valArr = [];

        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i].head()){
                let temp = this.buckets[i].listHead;

                while(temp != null){
                    valArr.push(temp.value);

                    temp = temp.nextNode;
                }
            }
        }

        return valArr;
    }

    entries(){
        let Arr = [];

        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i].head()){
                let temp = this.buckets[i].listHead;

                while(temp != null){
                    let key = temp.key;
                    let value = temp.value;
                    Arr.push([key, value]);

                    temp = temp.nextNode;
                }
            }
        }

        return Arr;
    }


}

const hashmap = new HashMap();

console.log(hashmap.hash('testinput'));
hashmap.set('testinput', 'testValue');
hashmap.set('testinput', 'secondTestValue');
hashmap.set('testinput2', 'thirdTestValue');
console.log(hashmap.get('testinput'));
console.log(hashmap.has('testinput'));
// console.log(hashmap.remove('testinput'));
// hashmap.clear();
console.log(hashmap.buckets);
console.log(hashmap.length());
console.log(hashmap.keys());
console.log(hashmap.values());
console.log(hashmap.entries());
