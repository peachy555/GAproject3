# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Start of seeds file'
User.destroy_all
Project.destroy_all
Page.destroy_all
Highlighter.destroy_all
Highlight.destroy_all
Note.destroy_all

u1  = User.create(email: "peach@wdi.com", password: "test", name: "Peach")
u2  = User.create(email: "diego@wdi.com", password: "test", name: "Diego")
u3  = User.create(email: "luke@wdi.com", password: "test", name: "Luke")
u4  = User.create(email: "xander@wdi.com", password: "test", name: "Xander")
u5  = User.create(email: "jin@wdi.com", password: "test", name: "Jin")
u6  = User.create(email: "hen@wdi.com", password: "test", name: "Hen")
u7  = User.create(email: "petr@wdi.com", password: "test", name: "Petr")
u8  = User.create(email: "jared@wdi.com", password: "test", name: "Jared")
u9  = User.create(email: "kevin@wdi.com", password: "test", name: "Kevin")
u10 = User.create(email: "olivia@wdi.com", password: "test", name: "Olivia")
u11 = User.create(email: "hayley@wdi.com", password: "test", name: "Hayley")

pj1 = Project.create(name: "Artificial Intelegence")
pj2 = Project.create(name: "Functional Programming")

pg1 = Page.create(title: "Artificial Intelligence: A Modern Approach", project: pj1, content: "Rather than taking plans to be sequences of actions, which may only rarely execute as expected, we take them to be mappings from situations to actions that specify the agent’s behavior no matter what may happen. In many cases, we may not want a full policy; methods for developing partial policies and conditional plans for completely observable domains are the subject of much current interest [13,15,61]. A weakness of the methods described in this paper is that they require the states of the world to be represented enumeratively, rather than through compositional representations such as Bayes nets or probabilistic operator descriptions. However, this work has served as a substrate for development of algorithms for more complex and efficient representations [6]. Section 6 describes the relation between the present approach and prior research in more detail. One important facet of the POMDP approach is that there is no distinction drawn between actions taken to change the state of the world and actions taken to gain information. This is important because, in general, every action has both types of effect. Stopping to ask questions may delay the robot’s arrival at the goal or spend extra energy; moving forward may give the robot information that it is in a dead-end because of the resulting crash. Thus, from the POMDP perspective, optimal performance involves something akin to a “value of information” calculation, only more complex; the agent chooses between actions based on the amount of information they provide, the amount of reward they produce, and how they change the state of the world.
\n
This paper is intended to make two contributions. The first is to recapitulate work from the operations-research literature [36,42,56,59,64] and to describe its connection to closely related work in AI. The second is to describe a novel algorithmic approach for solving POMDPS exactly. We begin by introducing the theory of Markov decision processes (MDPS) and POMDPS. We then outline a novel algorithm for solving POMDPS off line and show how,
in some cases, a finite-memory controller can be extracted from the solution to a POMDP. We conclude with a brief discussion of related work and of approximation methods.
\n
in this paper, we bring techniques from operations research to bear on the problem of choosing optimal actions in partially observable stochastic domains. Problems like the one described above can be modeled as partially observable Markov decision processes (POMDPS). Of course, we are not interested only in problems of robot navigation. Similar problems come up in factory process control, oil exploration, transportation logistics, and
a variety of other complex real-world situations. This is essentially a planning problem: given a complete and correct model of the world dynamics and a reward structure, find an optimal way to behave. In the artificial
intelligence (AI) literature, a deterministic version of this problem has been addressed by adding knowledge preconditions to traditional planning systems [43]. Because we are interested in stochastic domains, however, we must depart from the traditional AI planning model.")

pg2 = Page.create(title: "Planning and acting in partially observable stochastic domains", project: pj1, content: "in this paper, we bring techniques from operations research to bear on the problem of choosing optimal actions in partially observable stochastic domains. Problems like the one described above can be modeled as partially observable Markov decision processes (POMDPS). Of course, we are not interested only in problems of robot navigation. Similar problems come up in factory process control, oil exploration, transportation logistics, and
a variety of other complex real-world situations. This is essentially a planning problem: given a complete and correct model of the world dynamics and a reward structure, find an optimal way to behave. In the artificial
intelligence (AI) literature, a deterministic version of this problem has been addressed by adding knowledge preconditions to traditional planning systems [43]. Because we are interested in stochastic domains, however, we must depart from the traditional AI planning model.
\n
Rather than taking plans to be sequences of actions, which may only rarely execute as expected, we take them to be mappings from situations to actions that specify the agent’s behavior no matter what may happen. In many cases, we may not want a full policy; methods for developing partial policies and conditional plans for completely observable domains are the subject of much current interest [13,15,61]. A weakness of the methods described in this paper is that they require the states of the world to be represented enumeratively, rather than through compositional representations such as Bayes nets or probabilistic operator descriptions. However, this work has served as a substrate for development of algorithms for more complex and efficient representations [6]. Section 6 describes the relation between the present approach and prior research in more detail. One important facet of the POMDP approach is that there is no distinction drawn between actions taken to change the state of the world and actions taken to gain information. This is important because, in general, every action has both types of effect. Stopping to ask questions may delay the robot’s arrival at the goal or spend extra energy; moving forward may give the robot information that it is in a dead-end because of the resulting crash. Thus, from the POMDP perspective, optimal performance involves something akin to a “value of information” calculation, only more complex; the agent chooses between actions based on the amount of information they provide, the amount of reward they produce, and how they change the state of the world.
\n
This paper is intended to make two contributions. The first is to recapitulate work from the operations-research literature [36,42,56,59,64] and to describe its connection to closely related work in AI. The second is to describe a novel algorithmic approach for solving POMDPS exactly. We begin by introducing the theory of Markov decision processes (MDPS) and POMDPS. We then outline a novel algorithm for solving POMDPS off line and show how,
in some cases, a finite-memory controller can be extracted from the solution to a POMDP. We conclude with a brief discussion of related work and of approximation methods.")

pg3 = Page.create(title: "Agent-based computing, adaptive algorithms and bio computing ", project: pj1, content: "The Workshop 'Agent-Based Simulation, Adaptive Algorithms and Bio Computing' follows meetings which held in Kraków, Poland 2004, Atlanta 2005, Reading 2006 and Beijing 2007, Kraków 2008, Baton Rouge 2009 in frame on ICCS series of conferences. The first group of papers accepted to the Workshop fits into the categories of multi-agent systems in integration of different approaches as well as the multi-agent systems in high performance processing. The paper “A new agentbased paradigm for recognition of free-hand sketches” by Fernández-Pacheco et al. presents a new agent-based paradigm for recognition of free-hand sketches. The recognition process is supported by two level agents: Primitive Agents which are in charge of syntactic recognition, and Combined Agents which carry out semantic recognition using contextual information. A number of advantages of the proposed paradigm over existing approaches are discussed.
\n
A first implementation of the Primitive Agents has been performed and evaluated by means of several tests, achieving a success ratio of 96.41%. The paper “A Software environment for a human-aware ambient agent supporting attention-demanding tasks” by Memon et al. introduces a software environment for a human-aware
ambient agent that provides support for a human performing an attention-demanding task. The agent obtains human
attention-awareness by use of a dynamical model of human attention, gaze sensoring by an eye-tracker, and information about features of the objects in the environment. It has been implemented in a component-based, eventdriven manner within the Adobe® Flex® environment, thereby also integrating the Tobii® eye-tracker. It has been applied in a setup for a task where the human has to identify enemies and allies, and eliminate the enemies. The last paper from the group, “Platform for distributed execution of agents for trusted data collection” by Emil Gatial et al., presents a design and implementation of a platform, which allows for obtaining trusted data collection from heterogeneous distributed sources including legacy systems and users. The Authors adopted the existing production grade service platform Jini to host agents. Presented architecture was demonstrated on the use-case scenario for drug distribution during pandemic process mitigation.")

pg4 = Page.create(title: "Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire", project: pj2, content: "Among the many styles and methodologies for the construction of computer programs the Squiggol style
in our opinion deserves attention from the functional programming community. The overall goal of Squiggol is to calculate programs from their specification in the way.a mathematician calculates solutions to differential equations, or uses arithmetic to solve numerical problems. It is not hard to state, prove and use laws for well-known operations such as addition, multiplication and ---at the function level-- composition. It is, however, quite hard to state, prove and use laws for arbitrarily recursively defined functions, mainly because it is difficult to refer to the recursion scheme in isolation. The algorithmic structure is obscured by using unstructured recursive definitions. We crack this problem by treating various recursion schemes as separate higher order functions, giving each a notation of its own independent of the ingredients with which it constitutes a recursively defined function.
\n
This philosophy is similar in spirit to the 'structured programming' methodology for imperative programming. The use of arbitrary goto's is abandoned in favour of structured control flow primitives such as conditionals and while-loops that replace fixed patterns of goto's, so that reasoning about programs becomes feasible and sometimes even elegant. For functional programs the question is which recursion schemes are to be chosen as a basis for a calculus of programs. We shall consider several recursion operators that are naturally associated with algebraic type definitions. A number of general theorems are proven about these operators and subsequently used to transform programs and prove their correctness. Bird and Meertens [4, 18] have identified several laws for specific data types (most notably finite lists) using which they calculated solutions to various programming problems. By embedding the calculus into a categorical framework, Bird and Meertens' work on lists can be extended to arbitrary, inductively defined data types [17, 12]. Recently the group of Backhouse [1] has extended the calculus to a relational framework, thus covering indeterminancy.")

pg5 = Page.create(title: "On agent-based software engineering", project: pj2, content: "The first step in arguing for an agent-oriented approach to software engineering is to
precisely identify and define the key notions and concepts of agent-based computing.
Defining and classifying phenomena is always a task fraught with difficulty—there will
always be objections to basic definitions, arguments that important points have been
overlooked, or claims that it is really nothing new anyway. Such observations are especially
pertinent if the entity to be defined is both intangible and a relatively new phenomenon.
Nevertheless, such definitions are precisely what are needed in order to argue for agentoriented
software engineering. Given this necessity, the approach taken here is to offer
a definition that is sufficiently encompassing to cover a broad range of phenomena that
can reasonably go under the heading of agent-based systems, yet sufficiently tight that it
can rule out systems that are clearly not agent-based. Around the edges there will always be debate. Moreover, the definitions offered here concentrate on necessary, rather than
sufficient, conditions so they can always be extended.
\n
Here the key definitional problem relates to the term “agent”. At present, there is much
debate [16], and little consensus, about exactly what constitutes agenthood. However, an
increasing number of researchers find the following characterisation useful [59]:
\n
When adopting an agent-oriented view of the world, it soon becomes apparent that most
problems require or involve multiple agents; to represent the decentralised nature of
the problem, the multiple loci of control, the multiple perspectives or the competing
interests [3]. Moreover, the agents will need to interact with one another, either to achieve
their individual objectives or to manage the dependencies that ensue from being situated
in a common environment [9,29]. These interactions can vary from simple information
interchanges, to requests for particular actions to be performed and on to cooperation,
coordination and negotiation in order to arrange interdependent activities. In all of these
cases, however, there are two points that qualitatively differentiate agent interactions from
those that occur in other computational models. Firstly, agent-oriented interactions are
conceptualised as taking place at the knowledge level [40]. That is, they are conceived
in terms of which goals should be followed, at what time, and by whom (cf. method
invocation or function calls that operate at a purely syntactic level). Secondly, as agents
are flexible problem solvers, operating in an environment over which they have only
partial control and observability, interactions need to be handled in a similarly flexible")

ht1 = Highlighter.create(name: "Human logic", color: "#c9deff", backgroundColor: "#05347f", project: pj1)
ht2 = Highlighter.create(name: "Computer logic", color: "#ead188", backgroundColor: "#af3b3b", project: pj1)
ht3 = Highlighter.create(name: "Function", color: "#134201", backgroundColor: "#c9fcb5", project: pj2)

pj1.users << u1
pj1.users << u2
pj1.users << u3
pj1.users << u4
pj1.users << u5
pj1.users << u6
pj1.users << u7
pj1.users << u8
pj1.users << u9
pj1.users << u10
pj1.users << u11
pj2.users << u1
pj2.users << u2
pj2.users << u3
pj2.users << u5
pj2.users << u6
pj2.users << u8
pj2.users << u9

puts 'End of seeds file'
