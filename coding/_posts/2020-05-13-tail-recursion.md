---
title:  "Tail Recursion"
date:   2021-05-13 08:00:00
layout: post
tags: coding
---
One of the concepts I have always found most fascinating in programming is the idea of recursive functions.  After all, defining a function in terms of itself is an elegant solution.  
Although recursion can be inefficient in terms of memory usage, there is a simple trick for making recursive code more efficient: **tail recursion**.  
Today we will have a look at what it is, how we can use it, and why we should use it.  
{: .text-justify}

## An example of recursion

Say we have a tune like this one: 

![Motif1](/assets/motif1.jpg)

We know that its notes correspond to the following MIDI values: *60, 57, 60, 60, 62, 59*.  

We want to write a function that rises the above tune, described by the sequence of its MIDI values, by an octave. This means that each MIDI value should be increased by 12.  
{: .text-justify}

The tune would become:

![Motif1](/assets/motif2.jpg)

with MIDI values: *72, 69, 72, 72, 74, 71*.  

We can define this operation by leveraging the [recursive definition of a list][recursive datatype on wikipedia]. This operation has to handle two cases:  
{: .text-justify}

1. **The input list is empty: List ( )**  
    In this case, return the empty list.
2. **There is a value in the head of the input list: List ( pitch, ..... )**  
    In this case, transpose the value of this pitch an octave up and apply again this logic to the tail of the list. Here is where we do the recursive call of the operation.  
    {: .text-justify}

The result of the process will be a list of all the updated pitch values.  
Let's call this operation *octaveUp* and see in detail how this works for the above tune.  
{: .text-justify}

### How it works

- We start by applying the operation to our list of pitches  
  {: .text-justify}
  
  ```pseudocode
  octaveUp( List (60, 57, 60, 60, 62, 59) )
  ```
  
- The list we provided falls in the second case, so we update the first value in the list and call again *octaveUp* on the rest of the list. We have  
  {: .text-justify}
  
  ```pseudocode
  (60 + 12) , octaveUp( List (57, 60, 60, 62, 59) )
  ```
  
- The application of the operation on the tail of the list produces  
   
   ```pseudocode
   (57 + 12) , octaveUp( List (60, 60, 62, 59) )
   ```
   
- Then we continue the process  
  
  ```pseudocode
  (60 + 12) , octaveUp( List (60, 62, 59) )
  (60 + 12) , octaveUp( List (62, 59) )
  (62 + 12) , octaveUp( List (59) )
  (59 + 12) , octaveUp( List ( ) )
  ```
  
- The last call is on an empty list, so it falls in the first case  
  
  ```pseudocode
  List( )
  ```

Now that all the values in the list have been updated, the updated list can be built. The operation picks all the updated values, going bottom-up, and puts each one as the head of the list being built:  
{: .text-justify}

```pseudocode
List ( )
List ( 71 )
List ( 74, 71 )
List ( 72, 74, 71 )
List ( 72, 72, 74, 71 )
List ( 69, 72, 72, 74, 71 )
List ( 72, 69, 72, 72, 74, 71 )
```


A Scala implementation of this operation is the following:

``` scala
def octaveUp(pitches: List[Int]): List[Int] = pitches match {
        case Nil            => Nil
        case ::(head, tail) => (head + 12) +: octaveUp(tail)
}
```

When applied to our tune, it produces:

``` scala
val result = octaveUp(List(60, 57, 60, 60, 62, 59))
result: List[Int] = List(72, 69, 72, 72, 74, 71)
```



## What is tail recursion

**A tail-recursive function is a function that calls itself as the very last action.**  
The function we defined earlier is not tail-recursive. This is because in the second case, once the recursive call returns, it still has to put the updated value in the list being built.  
For example, this is what it looks like when the recursive call returns in the last step :  
{: .text-justify}

```scala
(head + 12) +: octaveUp(tail)	//  72 +: List ( 69, 72, 72, 74, 71 )
```

In order to make our function a tail-recursive one, we have to define a helper function. This new function will be similar to *octaveUp*, but it will take an extra argument: the result accumulator, which in this case will be an empty list.  
Let's call this helper function *go*:  
{: .text-justify}	

```pseudocode
octaveUp( pitches ) = go ( pitches ,  List ( ) ) 
```

The idea is to put the updated values in the accumulator as we go along, rather than waiting until the end and then adding all the values to the list backwards.  
Like before, there are two cases in the *go* function:  
{: .text-justify}	

1. **The input list is empty: List ( )**  
   In this case, return the accumulator.
2. **There is a value in the head of the input list: List ( pitch, ..... )**  
   In this case, transpose the value of this pitch an octave up, put it in the accumulator, and call again *go* passing the tail of the list and the updated accumulator.  
   {: .text-justify}	

Let's see this in action:

- We start by applying the operation to our list of pitches  
  
  ```pseudocode
  octaveUp( List (60, 57, 60, 60, 62, 59) ) = go ( List (60, 57, 60, 60, 62, 59) , List ( ) )
  ```
  
- The input list falls in the second case, so we determine the first value in the list, update the accumulator, and call again *go* on the rest of the list using the updated accumulator. We have  
  {: .text-justify}	
  
  ```pseudocode
  go ( List (57, 60, 60, 62, 59) , List ( 72 ) )
  ```
  
- The application of *go* on the tail of the list produces  
  
  ```pseudocode
  go ( List (60, 60, 62, 59) , List ( 72, 69 ) )
  ```
  
- If we continue the process  
  
  ```pseudocode
  go ( List (60, 62, 59) , List ( 72, 69, 72 ) )  
  go ( List (62, 59) , List ( 72, 69, 72, 72 ) )  
  go ( List (59) , List ( 72, 69, 72, 72, 74 ) )  
  go ( List ( ) , List ( 72, 69, 72, 72, 74, 71 ) )  
  ```
  
- The last call is on an empty list, so it falls in the first case. The new function returns the accumulator  
  
  ```pseudocode
  List ( 72, 69, 72, 72, 74, 71 )
  ```

That's it! It doesn't have to go backward and build the resulting list.

Our Scala implementation becomes:


``` scala
def octaveUp(pitches: List[Int]): List[Int] = {
  def go(pitches: List[Int], acc: List[Int]): List[Int] = pitches match {
    case Nil            => acc
    case ::(head, tail) => go(tail, acc :+ (12 + head))
  }
  go(pitches, List.empty)
}
```

When applied to our tune, it produces exactly the previous result:

``` scala
val resultTail = octaveUp(List(60, 57, 60, 60, 62, 59))
result: List[Int] = List(72, 69, 72, 72, 74, 71)
```

### A Scala extra bit

In Scala, we can annotate a function with *@tailrec* to have the compiler throw an error if the annotated function is not tail-recursive. Moreover, when we define a tail-recursive function, the Scala compiler will optimize the JVM bytecode so that the function requires only one stack frame (instead of one stack frame for each recursive call).  
Here is the final version of *octaveUp* in Scala:  
{: .text-justify}	

```scala
def octaveUp(pitches: List[Int]): List[Int] = {
  @tailrec
  def go(pitches: List[Int], acc: List[Int]): List[Int] = pitches match {
    case Nil            => acc
    case ::(head, tail) => go(tail, acc :+ (12 + head))
  }
  go(pitches, List.empty)
}
```





[recursive datatype on wikipedia]: https://en.wikipedia.org/wiki/Recursive_data_type